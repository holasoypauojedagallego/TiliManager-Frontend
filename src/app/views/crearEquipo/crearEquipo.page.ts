import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';
import { IonContent, IonItem, IonInput, IonButton, IonAlert, IonIcon, NavController, IonLoading } from '@ionic/angular/standalone';
import { JugadoresService } from '../../services/jugadores.service';
import { firstValueFrom } from 'rxjs';
import { JugadorCard } from "src/app/components/jugador-card/jugador-card.component";
import { HeaderComponent } from "src/app/components/header/header.component";
import { AuthService, Jugador, JugadorLeague } from 'src/app/services/auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-crear-equipo',
  templateUrl: './crearEquipo.page.html',
  styleUrls: ['./crearEquipo.page.scss'],
  standalone: true,
  imports: [IonContent, CommonModule, FormsModule, JugadorCard, IonItem, IonInput, IonButton, IonAlert, IonIcon, HeaderComponent, ReactiveFormsModule, IonLoading]
})
export class CrearEquipoPage implements OnInit {

  teamForm : FormGroup = new FormGroup({});
  id: number = 0;

  jugadoresSinEquipo: JugadorLeague[] = [];
  jugadoresParaFichar: JugadorLeague[] = [];
  dineroTotalJugadores: number = 0;

  teamUpdated: boolean = false;

  alerta: boolean = true;
  alertaJugador: boolean = false;
  nameCreated: boolean = false;
  alertaName: boolean = false;
  alertButtons = ['Aceptar'];

  constructor(private jugadores : JugadoresService, private fb : FormBuilder, private auth: AuthService, private navCtrl: NavController, private activeRoute: ActivatedRoute) { }

  async ngOnInit() {
    const idparam = this.activeRoute.snapshot.paramMap.get('id');
    this.id = Number(idparam);
    this.auth.id.set(this.id);
    this.teamForm = this.fb.group({
     name : ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20), Validators.pattern('^[a-zA-Z0-9._+-]([a-zA-Z0-9._+ -]*[a-zA-Z0-9._+-])?$')]],
    });
    try {
      this.jugadoresSinEquipo = await firstValueFrom(this.jugadores.getJugadoresTeamIdNull(this.id.toString()));
      this.jugadoresSinEquipo.sort((a, b) => a.player.price - b.player.price);
    } catch (error) {
      console.error("Ha ocurrido un error al buscar los jugadores")
    }
  }

  ficharJugador(jugador: Jugador){
    for (let i = 0; i < this.jugadoresParaFichar.length; i++) {
      if (this.jugadoresParaFichar[i].player == jugador){
        this.jugadoresParaFichar.splice(i, 1);
        this.dineroTotalJugadores = this.dineroTotalJugadores - jugador.price;
        return;
      }
    }
    const jugadorAFichar:JugadorLeague | undefined = this.jugadoresSinEquipo.find(pla => pla.player.id === jugador.id);
    if (jugadorAFichar){
      this.jugadoresParaFichar.push(jugadorAFichar);
      this.dineroTotalJugadores = this.dineroTotalJugadores + jugadorAFichar.player.price;
    }

  }

  async onCreateTeam() {
    const nameData = {
      name: this.teamForm.value.name
    }

    this.nameCreated = await firstValueFrom(this.auth.teamNameRegistered(nameData.name));
    if (this.nameCreated) {
      this.teamForm.controls['name'].reset();
      this.alertaName = true;
      return;
    }
    const dineroTeam:number = await this.auth.getMoney();
    if (this.jugadoresParaFichar.length < 5 || this.jugadoresParaFichar.length > 7 || this.dineroTotalJugadores > dineroTeam) {
      this.alertaJugador = true;
      return;
    }

    const response = await this.auth.updateTeam(nameData.name, this.jugadoresParaFichar, this.dineroTotalJugadores, this.id);

    if (response == undefined || response == null) {
      return;
    }

    response.subscribe({
      next: async (correct) => {
        console.log("SISISI vaaa!!!", correct);
        await this.auth.removeTeamSesion();
        await this.auth.setSesionTeam();
        console.log("Team: ", this.auth.getTeamSesion());
        await this.navCtrl.navigateRoot('/', { animated: true });
      },
      error: (err) => {
        console.log("no va jopetitas", err);
      }
    });
    
  }

}

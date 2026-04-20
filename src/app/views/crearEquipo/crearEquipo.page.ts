import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';
import { IonContent, IonItem, IonInput, IonButton, IonAlert, IonIcon, NavController } from '@ionic/angular/standalone';
import { Jugador, JugadoresService } from '../../services/jugadores.service';
import { firstValueFrom } from 'rxjs';
import { JugadorCard } from "src/app/components/jugador-card/jugador-card.component";
import { HeaderComponent } from "src/app/components/header/header.component";
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-crear-equipo',
  templateUrl: './crearEquipo.page.html',
  styleUrls: ['./crearEquipo.page.scss'],
  standalone: true,
  imports: [IonContent, CommonModule, FormsModule, JugadorCard, IonItem, IonInput, IonButton, IonAlert, IonIcon, HeaderComponent, ReactiveFormsModule]
})
export class CrearEquipoPage implements OnInit {

  teamForm : FormGroup = new FormGroup({});

  jugadoresSinEquipo: Jugador[] = [];
  jugadoresParaFichar: Jugador[] = [];
  dineroTotalJugadores: number = 0;

  teamUpdated: boolean = false;

  alerta: boolean = true;
  alertButtons = ['Aceptar'];

  constructor(private jugadores : JugadoresService, private fb : FormBuilder, private auth: AuthService, private navCtrl: NavController) { }

  async ngOnInit() {
    this.teamForm = this.fb.group({
     name : ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20), Validators.pattern('^[a-zA-Z0-9._+-]([a-zA-Z0-9._+ -]*[a-zA-Z0-9._+-])?$')]],
    });
    try {
      const response : Jugador[] = await firstValueFrom(this.jugadores.getJugadores());
      for (let i = 0 ; i < response.length; i++) {  
        if (response[i].teamId === null) {
          this.jugadoresSinEquipo.push(response[i]);
        }
      }
    } catch (error) {
      console.error("Ha ocurrido un error")
    }
  }

  ficharJugador(jugador: Jugador){
    for (let i = 0; i < this.jugadoresParaFichar.length; i++) {
      if (this.jugadoresParaFichar[i] == jugador){
        this.jugadoresParaFichar.splice(i, 1);
        this.dineroTotalJugadores = this.dineroTotalJugadores - jugador.price;
        return;
      }
      
    }
    this.jugadoresParaFichar.push(jugador);
    this.dineroTotalJugadores = this.dineroTotalJugadores + jugador.price;
  }

  async onCreateTeam() {
    const nameData = {
      name: this.teamForm.value.name
    }

    const response = await this.auth.updateTeam(nameData.name, this.jugadoresParaFichar, this.dineroTotalJugadores);

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

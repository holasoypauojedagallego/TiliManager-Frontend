import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonContent, IonButton, NavController, IonCard, IonRefresher, IonIcon, IonRefresherContent, RefresherCustomEvent, IonAlert, IonModal, IonInput, IonItem } from '@ionic/angular/standalone';
import { HeaderComponent } from "src/app/components/header/header.component";
import { League, LeaguesService } from '../../services/leagues.service';
import { firstValueFrom } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-ligas',
  templateUrl: './ligas.page.html',
  styleUrls: ['./ligas.page.scss'],
  standalone: true,
  imports: [IonContent, CommonModule, IonButton, IonCard, HeaderComponent, IonRefresher, IonRefresherContent, IonAlert, IonModal, IonIcon, IonInput, IonItem, ReactiveFormsModule]
})
export class LigasPage implements OnInit {

  ligas: League[] = [];
  loading: boolean = true;

  equipo = this.auth.team;

  alerta: boolean = false;
  alertaBorrar: boolean = false;
  modalCrear: boolean = false;

  submit: boolean = false;

  leagueForm : FormGroup = new FormGroup({});

  constructor(private leagueService: LeaguesService, private auth: AuthService, private navCtrl: NavController, private fb : FormBuilder) {}

  async ngOnInit() {
    await this.onCargar();
    this.leagueForm = this.fb.group({
     name : ['', [Validators.required, Validators.minLength(3), Validators.maxLength(33), Validators.pattern('^[a-zA-Z0-9._+-]([a-zA-Z0-9._+ -]*[a-zA-Z0-9._+-])?$')]],
    });
  }

  handleRefresh(event: RefresherCustomEvent) {
      setTimeout(async () => {
        await this.onCargar();
        event.target.complete();
      }, 1000);
    }

  async onCargar() {
    try {
      this.loading = true;
      const data = await firstValueFrom(this.leagueService.getLeagues());
      this.ligas = data;
    } catch (error) {
      console.error("Error al obtener las ligas", error);
    } finally {
      this.loading = false;
    }
  }

  async createLeague() {
    if (this.ligas.filter(c => c.owner.name === this.equipo().owner.name).length >= 5) {
      this.alerta = true;
      return;
    }
    if (this.leagueForm.invalid) {
      this.leagueForm.markAsTouched();
      return;
    }
    const name:string = this.leagueForm.value.name;
    console.log(name);
    this.submit = true;
    try {
      const t:League = await this.leagueService.createLeague(name, false);
      await this.addThisTeamToLeague(t.id);
      await this.onCargar();
      this.modalCrear = false;
    } catch (error) {
      console.warn("Ha habido un error al crear la liga");
    }
  }

    async addThisTeamToLeague(id: number) {
    try {
      await this.leagueService.addTeamToLeague(id, this.equipo());
      await this.onCargar();
      this.modalCrear = false;
    } catch (error) {
      console.warn("Ha habido un error al unir el equipo a la liga");
    }
  }

  perteneceLiga(liga: League) : boolean{
    return liga.teams.filter(l => l.team.id === this.equipo().id).length > 0;
  }

  async deleteLeague(liga: League) {
    if (liga.owner.name != this.equipo().owner.name) {
      this.alerta = true;
      return;
    }
    try {
      await this.leagueService.deleteLeague(liga.id, liga.name);
      await this.onCargar();
      this.alertaBorrar = false
    } catch (error) {
      console.warn("Ha habido un error al borrar la liga");
    }
  }

  goToLeague(id: number) {
    this.navCtrl.navigateForward(`/liga/${id}`);
  }
}
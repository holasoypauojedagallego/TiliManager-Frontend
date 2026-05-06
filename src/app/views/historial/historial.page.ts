import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonRefresher, IonRefresherContent, RefresherCustomEvent, IonItem, IonLabel, IonAccordion, IonAccordionGroup, IonButton, IonSearchbar } from '@ionic/angular/standalone';
import { Match, PartidoEmulado, PartidosService } from 'src/app/services/partidos.service';
import { HeaderComponent } from "src/app/components/header/header.component";
import { Router } from '@angular/router';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.page.html',
  styleUrls: ['./historial.page.scss'],
  standalone: true,
  imports: [IonContent, CommonModule, FormsModule, IonRefresher, IonRefresherContent, IonItem, IonLabel, HeaderComponent, IonAccordion, IonAccordionGroup, IonButton, IonSearchbar]
})
export class HistorialPage implements OnInit {

  historialPartidos: Match[] = [];
  expandedMatchId: number | null = null;

  constructor(private partidos: PartidosService, private router: Router) { }

  async ngOnInit() {
    await this.onCargar();
  }

  async onCargar() {
    await this.partidos.onCargar();
    this.historialPartidos = this.partidos.getHistorialPartido();
    console.log(this.historialPartidos);
  }

  handleRefresh(event: RefresherCustomEvent) {
    setTimeout(() => {
      this.onCargar();
      event.target.complete();
    }, 1000);
  }

  simularEncuentro(idMatch: number) {
    this.router.navigate(["/partido", idMatch])
  }

}

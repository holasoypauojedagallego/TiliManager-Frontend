import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { HeaderComponent } from "src/app/components/header/header.component";

@Component({
  selector: 'app-equipo',
  templateUrl: './equipo.page.html',
  styleUrls: ['./equipo.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, HeaderComponent]
})
export class EquipoPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}

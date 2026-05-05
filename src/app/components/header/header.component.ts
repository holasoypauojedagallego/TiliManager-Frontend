import { Component, Input, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonPopover, NavController, PopoverController, IonRouterOutlet } from "@ionic/angular/standalone";
import { AuthService, Team } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonPopover]
})
export class HeaderComponent  implements OnInit {
  @Input() title: string = 'TiliManager';
  @Input() dineroGastado: number = 0;
  @Input() returnBack: boolean = false;
  equipo = this.auth.team;

  constructor(private auth: AuthService, private navCtrl: NavController, private routerCtrl: IonRouterOutlet, private popOver: PopoverController) {}

  ngOnInit() {}

  async onCerrarSesion() {
    await this.auth.removeSesion();
    console.log(this.auth.getSesion());
    this.popOver.dismiss();
    if (document.activeElement instanceof HTMLElement){
      document.activeElement.blur();
    }
    this.navCtrl.navigateRoot('/login', { animated: true });
  }

  async goToLogin() {
    this.popOver.dismiss();
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
    await this.navCtrl.navigateRoot('/login', { animated: true });
  }

  smallerPrice(i: number) : String {
      if (!i || i == 0){
        return '0';
      }
      if (i > 1000000000) {
        return ((i / 1000000000).toFixed(1).replace('.0', '').toString()) + "MM";
      }
      else if (i > 1000000) {
        return ((i / 1000000).toFixed(1).replace('.0', '').toString()) + "M";
      } else if (i > 1000) {
        return ((i/1000).toFixed(1).replace('.0', '').toString()) + "K";
      }
      return i.toString();
  }

  Price(i: number) : String {
    return i.toLocaleString('es-ES');
  }

  goToHome(){
    if (document.activeElement instanceof HTMLElement){
      document.activeElement.blur();
    }
    if (this.routerCtrl?.canGoBack()) {
      this.navCtrl.back();
    } else {
      this.navCtrl.navigateRoot('/', { animated: true , animationDirection: 'back'});  
    }
  }

}

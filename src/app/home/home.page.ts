import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginPage } from '../login/login.page';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  data: any;

  datos_usuario = {
    nombre: "",
    apellido: ""
  }
  

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private alertController: AlertController) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state && 'user' in navigation.extras.state) {
      this.data = navigation.extras.state['user'];
      console.log(this.data);
    } else {
      this.router.navigate(['/login']);
    }
  }
  // Mostrar ventana emergente
  isAlertOpen = false;
  public alertButtons = ['OK'];

  setOpen(isOpen: boolean) {
    this.isAlertOpen = isOpen;
  }
  

  toLogin(){
    this.router.navigateByUrl('/login');
  }
}
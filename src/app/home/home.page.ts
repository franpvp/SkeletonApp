import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginPage } from '../login/login.page';
import { AlertController, AnimationController } from '@ionic/angular';
import { MatDatepicker, MatDatepickerInputEvent } from '@angular/material/datepicker';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  data: any;
  
  nombre: string | undefined;
  apellido: string | undefined;
  educacion: string | undefined;
  fechaNac: Date | undefined;
  animating: boolean | undefined;

  datos_usuario = {
    nombre: "",
    apellido: "",
    educacion: "",
    fechaNac: new Date
  }
  

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private alertController: AlertController, private animationCtrl: AnimationController) {

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

  // Método para borrar y animar campos Nombre y Apellido
  borrarCampos() {
    this.animating = true;
    setTimeout(() => {
      
      this.animating = false;
    }, 1000);

    this.datos_usuario.nombre = '';
    this.datos_usuario.apellido = '';

  }

  onFechaNacimientoChange(event: any) {
    // Acciones a realizar cuando se produce un cambio en la fecha
    console.log('Fecha seleccionada:', event.detail.value);
  }

  toLogin(){
    this.router.navigateByUrl('/login');
  }
}
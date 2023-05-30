import { Component, LOCALE_ID, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, AnimationController } from '@ionic/angular';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import * as moment from 'moment';

export const MY_FORMATS = {
  parse: {
    dateInput: 'DD-MM-YYYY',
  },
  display: {
    dateInput: 'DD-MM-YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'es' },
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
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
    fechaNac: moment(),
  }

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private alertController: AlertController, private animationCtrl: AnimationController,private dateAdapter: DateAdapter<any>) {

    registerLocaleData(localeEs);
    this.dateAdapter.setLocale('es');

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

  ngOnInit() {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state && 'user' in navigation.extras.state) {
      this.datos_usuario = navigation.extras.state['user'];
      console.log(this.datos_usuario);
    } else {
      this.router.navigate(['/login']);
    }
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

  onFechaNacimientoChange(event: MatDatepickerInputEvent<Date>) {
    this.datos_usuario.fechaNac = moment(event.value);
  }

  toLogin() {
    this.router.navigateByUrl('/login');
  }


  
}


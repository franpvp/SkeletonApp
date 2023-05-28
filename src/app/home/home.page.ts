import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginPage } from '../login/login.page';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  data: any;

  constructor(private activatedRoute: ActivatedRoute, private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state && 'user' in navigation.extras.state) {
      this.data = navigation.extras.state['user'];
      console.log(this.data);
    } else {
      this.router.navigate(['/login']);
    }
  }

  toLogin(){
    this.router.navigateByUrl('/login');
  }
}

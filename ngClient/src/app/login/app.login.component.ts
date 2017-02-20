import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {NgForm} from '@angular/forms';
import { LoginService } from './app.login.service';
import 'rxjs/Rx';
import {Properties, userDetails} from '../config';

@Component({
  selector: 'login',
  templateUrl: './app.login.html',
  styleUrls: ['./app.login.scss','../../assets/scss/loginProfile.scss']
})

export class LoginComponent {
   	showError:String;

	constructor(private router: Router, private loginService:LoginService){

	}

	loginMe(loginForm:NgForm){
		this.loginService.login(loginForm.value)
			.subscribe(
				(result) => {
					if(result.success){
						this.showError = '';
						window.sessionStorage.setItem('token', result.token);
						window.sessionStorage.setItem('userId', result.id);
						userDetails.setUserDetails(result.userDetails);
						this.router.navigate(['/chooseSeat']);
					}
				},
				(err) => {
					var res = JSON.parse(err._body);
	    			this.showError = res.err.message;
				}
			);
	}

}
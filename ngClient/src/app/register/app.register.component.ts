import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {NgForm} from '@angular/forms';
import { RegisterService } from './app.register.service';
import 'rxjs/Rx';
import {Properties} from '../config';

@Component({
  selector: 'register',
  templateUrl: './app.register.html',
  styleUrls: ['./app.register.scss','../../assets/scss/loginProfile.scss']
})

export class RegisterComponent {
	showError : String;
	properties:Object = Properties;
	
	constructor(private router: Router, private registerService:RegisterService){
		
	}

	registerMe(registerMe:NgForm){
		let formData = new FormData(),
			formFields = registerMe.value;

		for(let field in formFields){
			if(typeof formFields[field] === 'object'){
				formData.append(field , formFields[field].value);
			}else if(field === "profilePic"){
				formData.append(field , this.profilePic);
			}else{
				formData.append(field , formFields[field]);
			}
		}

		this.registerService.register(formData)
			.subscribe(
				(result) => {
					this.router.navigate(['/login']);
				},
				(err) => {
					var res = JSON.parse(err._body);
					this.showError = res.err.message;
				}
			);
	};

	profilePic(ev) {
		this.profilePic = ev.target.files[0];
	};

}

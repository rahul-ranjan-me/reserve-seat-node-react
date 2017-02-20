import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {Properties} from '../config';

@Injectable()
	export class RegisterService {

		constructor(private http: Http) {}

		register(registerField: Object) {
			return this.http
			.post(Properties.users+'/register', registerField)
			.map(response => response.json());
		}	
	}
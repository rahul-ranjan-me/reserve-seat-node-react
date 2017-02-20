import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {Properties} from '../config';

@Injectable()
	export class LoginService {

		constructor(private http: Http) {}

		login(loginInfo: Object) {
			return this.http
			.post(Properties.users+'/login', loginInfo)
			.map(response => response.json());
		}	
	}
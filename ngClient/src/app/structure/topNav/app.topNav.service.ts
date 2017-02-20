import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {Properties} from '../../config';

@Injectable()
	export class TopNavService {

		constructor(private http: Http) {}

		logout() {
			return this.http
			.get(Properties.users+'/logout')
			.map(response => response.json());
		}	
	}
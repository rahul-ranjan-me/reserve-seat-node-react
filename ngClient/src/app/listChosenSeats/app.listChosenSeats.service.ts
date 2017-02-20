import { Headers, Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {Properties} from '../config';

@Injectable()
	export class ListChosenSeatsService {
		private headers;
		
		constructor(private http: Http) {}

		makeBooking(seatsToBook) {
			this.headers = new Headers({'x-access-token': window.sessionStorage.getItem('token')});

			return this.http
			.put(Properties.bookInventory, seatsToBook, {headers:this.headers})
			.map(response => response.json());
		}	
	}
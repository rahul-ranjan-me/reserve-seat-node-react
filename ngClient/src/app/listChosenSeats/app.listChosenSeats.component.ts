import { Component } from '@angular/core';
import { Router } from '@angular/router';
import * as _ from "lodash";
import { ListChosenSeatsService } from './app.listChosenSeats.service';

@Component({
	selector: 'ListChosenSeats',
	templateUrl: './app.listChosenSeats.html',
	styleUrls: ['./app.listChosenSeats.scss','../../assets/scss/inventory.scss']
})

export class ListChosenSeatsComponent {
	private availableSeats:Array<any>;
	private chosenSeats:Array<any> = [];

	constructor(private router:Router, private listChosenSeatsService:ListChosenSeatsService){
		
	}

	makeBookings(seat){
		
	}

}
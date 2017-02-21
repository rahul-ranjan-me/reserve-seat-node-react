import { Component } from '@angular/core';
import { Router } from '@angular/router';
import * as _ from "lodash";
import { SeatViewerService } from './app.seatViewer.service';

@Component({
	selector: 'SeatViewer',
	templateUrl: './app.seatViewer.html',
	styleUrls: ['./app.seatViewer.scss','../../assets/scss/inventory.scss']
})

export class SeatViewerComponent {
	private availableSeats:Array<any>;
	private chosenSeats:Array<any> = [];

	constructor(private router:Router, private seatViewerService:SeatViewerService){
		this.seatViewerService.getSeats()
			.subscribe(
				(result) => {
					this.availableSeats = result;
				},
				(err) => {
					let msg = JSON.parse(err._body);
					if(err.status === 401 || msg.message === "No token provided!"){
		    			this.router.navigate(['/login']);
		    		}
				}
			);
	}

	selectSeats(seat){
		if(this.chosenSeats.length && _.findIndex(this.chosenSeats, {'_id': seat._id}) !== -1){
			this.chosenSeats.splice(_.findIndex(this.chosenSeats, {'_id': seat._id}), 1);
		}else{
			this.chosenSeats.push(seat)
		}
	}

	isSelected(seat){
		return _.find(this.chosenSeats, {'_id': seat._id}) ? true : false;
	}
}
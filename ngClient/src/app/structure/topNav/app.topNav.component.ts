import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {TopNavService} from './app.topNav.service';

@Component({
	selector: 'top-nav',
	templateUrl: './app.topNav.html',
	styleUrls: ['./app.topNav.scss']
})
export class TopNav {
	links: Array<any> = [
		{
			label: 'Choose seat',
			route: '/chooseSeat'
		},
		{
			label: 'Add/Update inventory',
			route: '/inventory'
		},
		{
			label: 'Your booked seats',
			route: '/bookedSeats'
		},
		{
			label: 'Profile',
			route: '/profile'
		}
	];

	constructor(private router: Router, private topNavService:TopNavService){

	}

	logout(){
		this.topNavService.logout()
			.subscribe(
				(result) => {
					window.sessionStorage.setItem('token', null);
					window.sessionStorage.setItem('userId', null);
					this.router.navigate(['/login']);
				}
			);
	}
}
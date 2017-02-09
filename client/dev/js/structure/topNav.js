import React, {Component} from 'react';
import { Link } from 'react-router';
import $ from 'jquery';
import properties from '../config';
require('../../scss/topNav.scss');


export default class Header extends Component {
	constructor(props){
		super(props);
		
		this.createLinksWrapper = this.createLinksWrapper.bind(this);
		this.logout = this.logout.bind(this);
		
		this.state = {
			links : [
				{
					label: 'Choose seat',
					route: 'chooseSeat'
				},
				{
					label: 'Add/Update inventory',
					route: 'inventory'
				},
				{
					label: 'Your booked seats',
					route: 'bookedSeats'
				},
				{
					label: 'Profile',
					route: 'profile'
				}
			]
		}
	}

	createLinksWrapper(key, index){
		var isSelected = function(){
			if(index === 0 & ! this.props.path){
				return true;
			}else if(this.props.path === key.route){
				return true;
			}else{
				return false;
			}
		}.bind(this);

		return <li key={key.route}><CreateLink isSelected={isSelected()} whichRoute={key} makeMeSelected={this.makeMeSelected} /></li>;
	}

	logout(){
		$.ajax({
			url: properties.users+'/logout',
			method: 'get',
			success: function(result){
				if(result.status){
					window.sessionStorage.setItem('token', null);
					window.sessionStorage.setItem('userId', null);
					window.location.href = "/login";
				}
	    	}
	    });
	}

	render(){
		return(
			<nav className="main-nav clearfix">
				<ul>
					{this.state.links.map(this.createLinksWrapper)}
					<li className="logout" onClick={this.logout}><span>Logout</span></li>
				</ul>
			</nav>
		)
	}
}

class CreateLink extends Component{
	constructor(props){
		super(props);
		this.makeMeSelected = this.makeMeSelected.bind(this);
	}

	makeMeSelected(key){
		this.props.makeMeSelected(this.props.whichRoute.route);
	}

	render(){
		let classNameSelected = this.props.isSelected ? 'selected' : null;
		return(
			<span className={classNameSelected}><Link to={this.props.whichRoute.route}>{this.props.whichRoute.label}</Link></span>
		)
	}
}
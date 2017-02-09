import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import properties from '../config';
import moment from 'moment';
import {selectInventory, inventoryGET, clearSelectionInventory} from '../actions/index';
import $ from 'jquery';

require('../../scss/seatViewer.scss');

class BookedSeatsViewer extends Component{
	constructor(props){
		super(props);
		this.getInventory = this.getInventory.bind(this);
		this.deleteInventory = this.deleteInventory.bind(this);
		this.getInventory();
	}

	getInventory(){
		$.ajax({
			url: properties.inventory+'/user/'+window.sessionStorage.getItem('userId'),
			headers : {
				"x-access-token": window.sessionStorage.getItem('token')
			},
			method: 'get',
			dataType : 'JSON',
			success: (result) => {
				this.props.inventoryGET(result);
	    	},
	    	error: function(s){
	    		if(s.status === 401){
	    			document.location.href= "/login";
	    		}
	    	}
	    });
	}

	deleteInventory(){
		var confirmMe = confirm('Are you sure  you want to cancel the booking?');
		if(confirmMe){
			window.setTimeout( () => {
				$.ajax({
					url: properties.inventory+'/user/'+window.sessionStorage.getItem('userId')+'/'+this.props.chosenInventory._id,
					headers : {
						"x-access-token": window.sessionStorage.getItem('token')
					},
					method: 'delete',
					dataType : 'JSON',
					success: (result) => {
						this.props.inventoryGET(result);
						window.setTimeout(() => {
							this.props.clearSelectionInventory(this.props.chosenInventory);
							this.props.selectInventory(this.props.chosenInventory);
						}, 200);
			    	}
			    });
			}, 500);
		}
	}

	createListItems(){
		const formatDate = (dateString) => {
			return moment(dateString, "x").format('Do MMM YYYY');
		}
		return this.props.inventories.map((inventory) => {
			var cssClass = inventory._id === this.props.chosenInventory._id ? 'selected seat' : 'seat',
				imageClass = inventory.type === 'Desktop' ? 'fa fa-desktop' : null;
			return (
				<li 
					key={inventory._id}
					onClick={() => this.props.selectInventory(inventory)}
					className= {cssClass}
				>
					<span className="deleteInventory"
						onClick={this.deleteInventory}
					><i className="fa fa-times" aria-hidden="true"></i></span>
					<div className="seatContainer">
						<div className="desktop-image"><i className={imageClass} aria-hidden="true"></i></div>
						
						<div className="meta-info">
							<p>Location: <strong>{inventory.location}</strong></p>	
							<p>Seat: <strong>{inventory.details.desktopDetails.seat}</strong></p>
							<p>Booked from: <strong>{formatDate(inventory.bookedFrom)}</strong></p>
							<p>Booked to: <strong>{formatDate(inventory.bookedTill)}</strong></p>
						</div>
						
						{inventory.details.desktopDetails.isWebCamAvailable ? <span className="webcam"><i className="fa fa-camera" aria-hidden="true"></i></span> : null}
						{inventory.details.desktopDetails.isHeadPhoneAvailable ? <span className="headphone"><i className="fa fa-headphones" aria-hidden="true"></i></span> : null}
					</div>

				</li>
			)
		});
	}

	render(){
		const mainContainerWidth = Object.keys(this.props.chosenInventory).length ? {width:'80%'} : {width:'100%'};
		return (
			<div className='seats contract' style={mainContainerWidth}>
				<ul>
					{this.createListItems()}
				</ul>
			</div>
		);
	}
}

function mapStateToProps(state){
	return {
		inventories : state.inventories,
		chosenInventory : state.chosenInventory
	}
}


function matchDispatchToProps(dispatch){
	return bindActionCreators({
		selectInventory : selectInventory,
		inventoryGET : inventoryGET,
		clearSelectionInventory : clearSelectionInventory
	}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(BookedSeatsViewer);
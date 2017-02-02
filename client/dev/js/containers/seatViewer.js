import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import $ from 'jquery';
import properties from '../config';
import {selectSeats, inventoryGET} from '../actions/index';

require('../../scss/seatViewer.scss');

class SeatViewer extends Component{
	constructor(props){
		super(props);
		this.getSeats = this.getSeats.bind(this);
		this.getSeats();
	}

	createListItems(){
		return this.props.availableSeats.map((availableSeat) => {
			var cssClass = _.find(this.props.chosenSeats, {'_id': availableSeat._id}) ? 'selected seat' : 'seat',
				imageClass = availableSeat.type === 'Desktop' ? 'fa fa-desktop' : null;
			
			if(availableSeat.isAvailable !== false) {
				return (
					<li 
						key={availableSeat._id}
						onClick={() => this.props.selectSeats(availableSeat)}
						className= {cssClass}
					>
						<div className="seatContainer">
							<div className="desktop-image"><i className={imageClass} aria-hidden="true"></i></div>
							
							<div className="meta-info">
								<p>Location: <strong>{availableSeat.location}</strong></p>	
								<p>Seat: <strong>{availableSeat.details.desktopDetails.seat}</strong></p>
							</div>
							
							{availableSeat.details.desktopDetails.isWebCamAvailable ? <span className="webcam"><i className="fa fa-camera" aria-hidden="true"></i></span> : null}
							{availableSeat.details.desktopDetails.isHeadphoneAvailable ? <span className="headphone"><i className="fa fa-headphones" aria-hidden="true"></i></span> : null}
						</div>

					</li>
				)
			
			}else{
				return null;
			}
		});
	}

	getSeats(){
		var that = this;
		$.ajax({
			url: properties.bookInventory,
			headers : {
				"x-access-token": window.sessionStorage.getItem('token')
			},
			method: 'get',
			dataType : 'JSON',
			success: function(result){
				that.props.inventoryGET(result)
	    	},
	    	error: function(s){
	    		if(s.status === 401){
	    			document.location.href = "/login";
	    		}
	    	}
	    });
	}

	render(){
		let cssClass = this.props.chosenSeats.length ? 'seats contract' : 'seats expand';
		return (
			<div className={cssClass}>
				<ul>
					{this.createListItems()}
				</ul>
			</div>
		);
	}
}

function mapStateToProps(state){
	return {
		availableSeats: state.inventories,
		chosenSeats : state.chosenSeats
	}
}


function matchDispatchToProps(dispatch){
	return bindActionCreators({
		selectSeats : selectSeats,
		inventoryGET: inventoryGET
	}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(SeatViewer);
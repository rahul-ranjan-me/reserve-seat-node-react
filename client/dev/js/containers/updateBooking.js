import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import properties from '../config';
import $ from 'jquery';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import {inventoryPUT, clearSelectionInventory} from '../actions/index';

require('../../scss/seatViewer.scss');
require('react-datepicker/dist/react-datepicker.css');

class UpdateBooking extends Component{
	constructor(props){
		super(props);
		this.updateBooking = this.updateBooking.bind(this);
		this.acknowledgementConfirmed = this.acknowledgementConfirmed.bind(this);
		this.state = {
			startDate : null,
			endDate : null,
			showAcknowledgement: false
		};
	}

	updateBooking(){
		$.ajax({
			url: properties.inventory+'/user/'+window.sessionStorage.getItem('userId')+'/'+this.props.chosenInventory._id,
			headers : {
				"x-access-token": window.sessionStorage.getItem('token')
			},
			data: {
				bookedFrom: moment(this.state.startDate, "x").toDate().valueOf(),
				bookedTill: moment(this.state.endDate, "x").toDate().valueOf()
			},
			method: 'put',
			dataType : 'JSON',
			success: (result) => {
				this.props.inventoryPUT(result);
				this.setState({showAcknowledgement : true});
	    	}
	    });
	}

	componentWillReceiveProps(nextProps){
		this.setState({
			startDate:moment(nextProps.chosenInventory.bookedFrom),
			endDate:moment(nextProps.chosenInventory.bookedTill)
		});
	}

	acknowledgementConfirmed(){
		this.setState({showAcknowledgement : false});
		this.props.clearSelectionInventory(this.props.chosenInventory);
	}

	render(){
		const chooseSeatHeight = Object.keys(this.props.chosenInventory).length ? {'opacity':1, height:'99%'} : null;
		const acknowledgementHeight = this.state.showAcknowledgement ? {'height': '100%'} : null;
		const formatDate = (dateString) => {
			return moment(dateString, "x").format('Do MMM YYYY');
		};
		return (
			<div className="seatBucket" style={chooseSeatHeight}>
				<h2>Choosen Seats</h2>
				
				{Object.keys(this.props.chosenInventory).length ? 
					<ul>
						<li>
							<div className="meta-info">
								<p>Location: <strong>{this.props.chosenInventory.location}</strong></p>
								<p>Type: <strong>{this.props.chosenInventory.type}</strong></p>
								<p>Seat: <strong>{this.props.chosenInventory.details.desktopDetails.seat}</strong></p>
								<p>isHeadPhone: <strong>{this.props.chosenInventory.details.desktopDetails.isHeadPhone ? 'Yes' : 'No'}</strong></p>
								<p>isWebCamAvailable: <strong>{this.props.chosenInventory.details.desktopDetails.isWebCamAvailable ? 'Yes' : 'No'}</strong></p>
							</div>
						</li>
					</ul>
					: null
				}

				<div className="dateChooser">
					<span>
						<strong>From:</strong>
						<DatePicker
							className='dateFrom'
							popoverTargetOffset='0px -28px'
							isClearable={true}
							dateFormat="DD/MM/YYYY"
				        	onChange={(date) => {
				        		this.setState({startDate: date});
				        	}}
				        	minDate = {moment()}
				        	maxDate = {this.state.endDate}
				        	selected={this.state.startDate}
				        	 />
				    </span>

				    <span>
				    	<strong>To:</strong>
					    <DatePicker
					    	className='dateTo'
							popoverTargetOffset='0px -28px'
					        isClearable={true}
					        dateFormat="DD/MM/YYYY"
					        onChange={ (date) => {
					        	this.setState({endDate: date});
					        }}
					        minDate = {this.state.startDate}
					        selected={this.state.endDate}
					         />
					</span>
				</div>

				<div className="submitRequest">
					<button type="button" disabled={!this.state.startDate || !this.state.endDate} onClick={this.updateBooking}>Submit</button>
				</div>

				<div className="acknowledgement" style={acknowledgementHeight}>

					<div className="acknowledgeContainer">
						<h4>Your following booking has been updated:</h4>
						{Object.keys(this.props.chosenInventory).length ? 
							<ul>
								<li>
									<p>Location: <strong>{this.props.chosenInventory.location}</strong></p>
									<p>Type: <strong>{this.props.chosenInventory.type}</strong></p>
									<p>Seat: <strong>{this.props.chosenInventory.details.desktopDetails.seat}</strong></p>
									<p>isHeadPhone: <strong>{this.props.chosenInventory.details.desktopDetails.isHeadPhone ? 'Yes' : 'No'}</strong></p>
									<p>isWebCamAvailable: <strong>{this.props.chosenInventory.details.desktopDetails.isWebCamAvailable ? 'Yes' : 'No'}</strong></p>
									<p>Booked from: <strong>{formatDate(this.state.startDate)}</strong></p>
									<p>Booked to: <strong>{formatDate(this.state.endDate)}</strong></p>
								</li>
							</ul>
							: null
						}

						<div className="submitAcknowledgement">
							<button type="button" onClick={this.acknowledgementConfirmed}>OK</button>
						</div>
					</div> 
				</div>

			</div>
		);
	}
}

function mapStateToProps(state){
	return {
		chosenInventory : state.chosenInventory
	}
}


function matchDispatchToProps(dispatch){
	return bindActionCreators({
		inventoryPUT: inventoryPUT,
		clearSelectionInventory: clearSelectionInventory
	}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(UpdateBooking);
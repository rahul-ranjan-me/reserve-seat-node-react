import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import properties from '../config';
import $ from 'jquery';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import {removeSeats, removeAllSeats, updateInventory} from '../actions/index';


require('../../scss/seatViewer.scss');
require('react-datepicker/dist/react-datepicker.css');

class ListchosenSeats extends Component{
	constructor(props){
		super(props);
		this.handleChangeStartDate = this.handleChangeStartDate.bind(this);
		this.handleChangeEndDate = this.handleChangeEndDate.bind(this);
		this.makeBooking = this.makeBooking.bind(this);
		this.createAcknowledgmentList = this.createAcknowledgmentList.bind(this);
		this.acknowledgementConfirmed = this.acknowledgementConfirmed.bind(this);
		this.state = {
			startDate : moment(),
			showAcknowledgement : false
		};
	}

	createListItems(){
		return this.props.chosenSeats.map((seat) => {
			return (
				<li 
					key={seat._id}
				>
					<span className="removeMe" 
						onClick={() => this.props.removeSeats(seat)}>
						<i className="fa fa-minus-square" aria-hidden="true"></i>
					</span>
					<div className="meta-info">
						<p>Location: <strong>{seat.location}</strong></p>	
						<p>Seat: <strong>{seat.details.desktopDetails.seat}</strong></p>
						<p>Type: <strong>{seat.type}</strong></p>
					</div>
				</li>
			)
		});
	}

	handleChangeStartDate(date) {
	    this.setState({
	      startDate: date
	    });
	}

	handleChangeEndDate(date) {
	    this.setState({
	      endDate: date
	    });
	}

	makeBooking(){

		var that = this, data = {
			bookedFrom: moment().utc(this.state.startDate).toDate().valueOf(),
			bookedTill: moment().utc(this.state.endDate).toDate().valueOf(),
			bookedOn : moment().utc().toDate().valueOf(),
			bookedBy : 'Rahul Ranjan',
			ids: []
		}

		for(var i=0; i<this.props.chosenSeats.length; i++){
			data.ids.push(this.props.chosenSeats[i]._id);
		}

		$.ajax({
			url: properties.bookInventory,
			method: 'put',
			headers : {
				"x-access-token": window.sessionStorage.getItem('token')
			},
			contentType:'application/json',
			data : JSON.stringify(data),
			dataType : 'json',
			success: function(result){
				data = {};
				that.setState({showAcknowledgement : true});
			}
	    });		
	}

	createAcknowledgmentList(){
		return this.props.chosenSeats.map((seat) => {
			return (
				<li 
					key={seat._id}
				>
					<p>Location: <strong>{seat.location}</strong></p>	
					<p>Seat: <strong>{seat.details.desktopDetails.seat}</strong></p>
					<p>Type: <strong>{seat.type}</strong></p>
				</li>
			)
		});
	}

	acknowledgementConfirmed(){
		this.setState({showAcknowledgement : false});
		this.props.updateInventory(this.props.chosenSeats);
		this.props.removeAllSeats();
		this.setState({
	      endDate: null
	    });
	}

	render(){
		const chooseSeatHeight = this.props.chosenSeats.length ? {'opacity':1, height:'100%'} : null;
		const acknowledgementHeight = this.state.showAcknowledgement ? {'height': '100%'} : null;
		return (
			<div className="seatBucket" style={chooseSeatHeight}>

				<h2>Choosen Seats</h2>
				
				<span className="clear-all" onClick={() => this.props.removeAllSeats(this.props.chosenSeats)}><i className="fa fa-times" aria-hidden="true"></i> Clear all</span>
				
				<ul>
					{this.createListItems()}
				</ul>

				<div className="dateChooser">
					<span>
						<strong>From:</strong>
						<DatePicker
							className='dateFrom'
							popoverTargetOffset='0px -28px'
							isClearable={true}
							dateFormat="DD/MM/YYYY"
				        	onChange={this.handleChangeStartDate}
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
					        onChange={this.handleChangeEndDate}
					        minDate = {this.state.startDate}
					        selected={this.state.endDate}
					         />
					</span>
				</div>		

				<div className="submitRequest">
					<button type="button" disabled={!this.state.startDate || !this.state.endDate} onClick={this.makeBooking}>Submit</button>
				</div>

				<div className="acknowledgement" style={acknowledgementHeight}>

					<div className="acknowledgeContainer">
						{this.props.chosenSeats.length > 1 ? <h4>Your following bookings have been confirmed</h4> : <h4>Your following booking has been confirmed</h4>}
						<ul>
							{this.createAcknowledgmentList()}
						</ul>

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
		availableSeats: state.availableSeats,
		chosenSeats : state.chosenSeats
	}
}


function matchDispatchToProps(dispatch){
	return bindActionCreators({
		removeSeats : removeSeats,
		removeAllSeats: removeAllSeats,
		updateInventory: updateInventory
	}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(ListchosenSeats);
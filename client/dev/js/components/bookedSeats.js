import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import properties from '../config';
import TopNav from '../structure/topNav';
import BookedSeatsViewer from '../containers/bookedSeatsViewer';
import UpdateBooking from '../containers/updateBooking';

export default class BookedSeats extends Component{
	constructor(props){
		super(props);
	}

	render(){
		return(
			<div className="height100">
				<TopNav path={this.props.routes[this.props.routes.length-1].path} />
				<div className="container-seat-chooser clearfix">
					<BookedSeatsViewer />
					<UpdateBooking />
				</div>
				
			</div>
		)
	}
};
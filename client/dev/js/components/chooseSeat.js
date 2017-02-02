import React, {Component} from 'react';
import TopNav from '../structure/topNav';
import SeatViewer from '../containers/seatViewer';
import ListChoosenSeats from '../containers/listChoosenSeats';

export default class ChooseSeat extends Component{
	constructor(props){
		super(props);
	}

	render(){
		return(
			<div className="height100">
				<TopNav path={this.props.routes[this.props.routes.length-1].path} />
				<div className="container-seat-chooser clearfix">
					<SeatViewer />
					<ListChoosenSeats />
				</div>
			</div>
		)
	}
}
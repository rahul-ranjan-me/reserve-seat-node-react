import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import properties from '../config';
import {selectInventory, inventoryGET, inventoryDELETE, clearSelectionInventory} from '../actions/index';
import $ from 'jquery';

require('../../scss/seatViewer.scss');

class InventoryViewer extends Component{
	constructor(props){
		super(props);
		this.getInventory = this.getInventory.bind(this);
		this.deleteInventory = this.deleteInventory.bind(this);
		this.getInventory();
	}

	getInventory(){
		var that = this;
		$.ajax({
			url: properties.inventory,
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
	    			document.location.href= "/login";
	    		}
	    	}
	    });
	}

	deleteInventory(){
		var that = this;
		window.setTimeout(function(){
			$.ajax({
				url: properties.inventory+'/'+that.props.chosenInventory._id,
				headers : {
					"x-access-token": window.sessionStorage.getItem('token')
				},
				method: 'delete',
				dataType : 'JSON',
				success: function(result){
					that.props.inventoryGET(result);
					window.setTimeout(function(){
						that.props.clearSelectionInventory(that.props.chosenInventory);
						that.props.selectInventory(that.props.chosenInventory);
					}, 200);
		    	}
		    });
		}, 500);
	}

	createListItems(){
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
							<p>Booked by: <strong>
							{	inventory.bookedBy && inventory.bookedBy.length > 0 ? 
								inventory.bookedBy
								: "Not booked"  }
							</strong></p>
						</div>
						
						{inventory.details.desktopDetails.isWebCamAvailable ? <span className="webcam"><i className="fa fa-camera" aria-hidden="true"></i></span> : null}
						{inventory.details.desktopDetails.isHeadPhoneAvailable ? <span className="headphone"><i className="fa fa-headphones" aria-hidden="true"></i></span> : null}
					</div>

				</li>
			)
		});
	}

	render(){
		return (
			<div className='seats contract'>
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
		inventoryDELETE : inventoryDELETE,
		clearSelectionInventory : clearSelectionInventory
	}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(InventoryViewer);
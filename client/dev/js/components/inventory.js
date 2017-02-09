import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import properties from '../config';
import TopNav from '../structure/topNav';
import InventoryViewer from '../containers/InventoryViewer';
import AddEditInventory from '../containers/AddEditInventory';
import {inventoryDELETEALL} from '../actions/index';
import $ from 'jquery';

class Inventory extends Component{
	constructor(props){
		super(props);
		this.deleteAllInventories = this.deleteAllInventories.bind(this);
	}

	deleteAllInventories(){
		var promptDelete = confirm('Are you sure you want to delete all the records?');

		if(promptDelete){
			console.log('delete all');
			$.ajax({
				url: properties.inventory,
				headers : {
					"x-access-token": window.sessionStorage.getItem('token')
				},
				method: 'delete',
				dataType : 'JSON',
				success: (result) => {
					console.log(result);
					this.props.inventoryDELETEALL();
		    	}
		    });
		}
		
	}

	render(){
		return(
			<div className="height100">
				<TopNav path={this.props.routes[this.props.routes.length-1].path} />
				<div className="deleteAllInventory">
					<button type="button" onClick={this.deleteAllInventories}>Delete all inventories</button>
				</div>
				<div className="container-seat-chooser clearfix">
					<InventoryViewer />
					<AddEditInventory />
				</div>
			</div>
		)
	}
};

function mapStateToProps(state){
	return {
		inventories : state.inventories
	}
}


function matchDispatchToProps(dispatch){
	return bindActionCreators({
		inventoryDELETEALL : inventoryDELETEALL		
	}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(Inventory);
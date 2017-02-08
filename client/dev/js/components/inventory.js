import React, {Component} from 'react';
import TopNav from '../structure/topNav';
import InventoryViewer from '../containers/InventoryViewer';
import AddEditInventory from '../containers/AddEditInventory';

export default class Inventory extends Component{
	constructor(props){
		super(props);
	}

	render(){
		return(
			<div className="height100">
				<TopNav path={this.props.routes[this.props.routes.length-1].path} />
				<div className="deleteAllInventory">
					<button type="button">Delete all inventory</button>
				</div>
				<div className="container-seat-chooser clearfix">
					<InventoryViewer />
					<AddEditInventory />
				</div>
			</div>
		)
	}
};

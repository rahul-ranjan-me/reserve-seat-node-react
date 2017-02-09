import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import $ from 'jquery';
import properties from '../config';
import {inventoryPUT, inventoryPOST, clearSelectionInventory} from '../actions/index';

require('../../scss/seatViewer.scss');

class ListchosenSeats extends Component{
	constructor(props){
		super(props);
		this.updateFields = this.updateFields.bind(this);
		this.submitForm = this.submitForm.bind(this);
		this.clearForm = this.clearForm.bind(this);
		this.doBulkUpload = this.doBulkUpload.bind(this);
		this.dataObj = ['location', 'type', 'seat', 'isWebCamAvailable', 'isHeadPhoneAvailable'];
	}

	updateFields(){
		if(Object.keys(this.props.chosenInventory).length){
			for(var i in this.dataObj){
				if(this.refs[this.dataObj[i]]){
					var propToChoose = this.props.chosenInventory;
					if(this.dataObj[i] === 'seat' || this.dataObj[i] === 'isWebCamAvailable' || this.dataObj[i] === 'isHeadPhoneAvailable'){
						propToChoose = this.props.chosenInventory.details.desktopDetails;
					}

					if(this.refs[this.dataObj[i]].type === "checkbox"){
						this.refs[this.dataObj[i]].checked = (propToChoose[this.dataObj[i]] == 1)?true:false;
					}else{
						this.refs[this.dataObj[i]].value = propToChoose[this.dataObj[i]];	
					}
					
				}
			}
		}else{
			this.clearForm();
		}
	}

	doBulkUpload(ev){
		ev.preventDefault();
		let formData = new FormData();
		formData.append("bulkUploadFile", this.bulkUploadFile);
		$.ajax({
			url: properties.inventory+'/bulkUpload',
			method: 'post',
			processData: false,
    		contentType: false,
			headers : {
				"x-access-token": window.sessionStorage.getItem('token')
			},
			data : formData,
			success: (result) => {
				this.props.inventoryPOST(result);
			}
	    });
	}

	clearForm(){
		for(var i in this.dataObj){
			if(this.refs[this.dataObj[i]]){
				if(this.refs[this.dataObj[i]].tagName === 'SELECT'){
					this.refs[this.dataObj[i]].value = 'Please select';
				}else if(this.refs[this.dataObj[i]].type === "checkbox"){
					this.refs[this.dataObj[i]].checked = false;
				}else{
					this.refs[this.dataObj[i]].value = '';
				}
			}
		}
		if(Object.keys(this.props.chosenInventory).length){
			this.props.clearSelectionInventory(this.props.chosenInventory);
		}
	}

	submitForm(){
		var that = this,
			url = properties.inventory,
			method = 'post',
			data = {
				details : {
					desktopDetails : {
						isHeadPhoneAvailable : this.refs.isHeadPhoneAvailable.checked ? 1 : 0,
						isWebCamAvailable : this.refs.isWebCamAvailable.checked ? 1 : 0,
						seat : this.refs.seat.value,
					}
				},
				location: this.refs.location.value,
				type: this.refs.type.value
			},
			isUpdate = Object.keys(this.props.chosenInventory).length;
		
		if(isUpdate){
			url = properties.inventory+'/'+this.props.chosenInventory._id;
			method = 'put';
			data._id  = this.props.chosenInventory._id
		}

		$.ajax({
			url: url,
			method: method,
			contentType:'application/json',
			headers : {
				"x-access-token": window.sessionStorage.getItem('token')
			},
			data : JSON.stringify(data),
			dataType : 'json',
			success: (result) => {
				if(isUpdate){
					this.props.inventoryPUT(data);
				}else{
					this.props.inventoryPOST(result);
				}
				data = {};
				this.clearForm();
	    	}
	    });
	}

	render(){
		{this.updateFields()}
		return (
			<div className="addEditForm">
				<div>

					<h2>Add/Edit Inventory</h2>
					<span className="clear-all" onClick={this.clearForm}><i className="fa fa-times" aria-hidden="true"></i> Clear</span>

					<ul>
						<li>
							<label htmlFor="location">Location</label>
							<select id="location"
								ref="location"
								defaultValue={this.props.chosenInventory.location ? this.props.chosenInventory.location:undefined} 
							>
								<option>Please select</option>
								<option>Gurgaon Ambience</option>
								<option>Gurgaon Cyber Greens</option>
								<option>Noida Green Boulevard</option>
							</select>
						</li>

						<li>
							<label htmlFor="isHeadPhoneAvailable">Headphone</label>
							<input type="checkbox" 
								id="isHeadPhoneAvailable"
								ref="isHeadPhoneAvailable"
								defaultValue={this.props.chosenInventory.details ? this.props.chosenInventory.details.desktopDetails.isHeadPhoneAvailable : null} 
							/>
						</li>

						<li>
							<label htmlFor="isWebCamAvailable">Webcam</label>
							<input type="checkbox" 
								id="isWebCamAvailable"
								ref="isWebCamAvailable"
								defaultValue={this.props.chosenInventory.details ? (this.props.chosenInventory.details.desktopDetails.isWebCamAvailable) : null} 
							/>
						</li>

						<li>
							<label htmlFor="details">Seat no.</label>
							<input type="text" 
								id="seat"
								ref="seat"
								defaultValue={this.props.chosenInventory.details ? this.props.chosenInventory.details.desktopDetails.seat : null} 
							/>
						</li>

						<li>
							<label htmlFor="type">Type</label>
							<select id="type"
								ref="type"
								defaultValue={this.props.chosenInventory.type ? this.props.chosenInventory.type:undefined} 
							>
								<option>Please select</option>
								<option>Desktop</option>
							</select>
						</li>
					</ul>

					<div className="submitRequest">
						<button type="button" disabled={this.isDisabled} onClick={this.submitForm}>Submit</button>
					</div>					
				</div>

				<div className="bulkUpload">
					<ul>
						<li>
							<label htmlFor="bulkUpload">Bulk Upload</label>
							<input type="file" id="bulkUpload" onChange = {(event) => {this.bulkUploadFile = event.target.files[0];}} />
						</li>
					</ul>

					<div className="submitRequest">
						<button type="button" onClick={this.doBulkUpload}>Bulk upload</button>
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
		inventoryPOST : inventoryPOST,
		inventoryPUT: inventoryPUT,
		clearSelectionInventory: clearSelectionInventory
	}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(ListchosenSeats);

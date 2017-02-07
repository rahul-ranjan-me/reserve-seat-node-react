import React, {Component} from 'react';
import $ from 'jquery';
import Select from 'react-select';
import properties from '../config';
import TopNav from '../structure/topNav';
import 'react-select/dist/react-select.css';

require('../../scss/login.scss');

export default class Profile extends Component{
	constructor(props){
		super(props);
		this.monthSelect = this.monthSelect.bind(this);
		this.locationSelect = this.locationSelect.bind(this);
		this.updateProfile = this.updateProfile.bind(this);

		this.state = {
			'isEdit' : false,
			'showError': false,
			'userDetails' : {}
		};

		this.form = [
			{type: 'birthMonth'}, 'birthDay',
			'birthYear', 'mobile', 'email', {type: 'location'} 
		]
	}

	monthSelect(month){
		this.setState({birthMonth: month.value});
	}

	locationSelect(location){
		this.setState({location: location.value});
	}

	updateProfile(e){
		e.preventDefault();
		let formData = new FormData();
		formData.append("id" , this.state.userDetails._id);
		this.form.map((field) => {
			if(typeof field === 'object'){
				formData.append(field.type , this.state[field.type]);
			}else{
				formData.append(field , this.refs[field].value);
			}
		});

		$.ajax({
			url: properties.users+'/registerfff',
			method: 'post',
			data : formData,
			processData: false,
    		contentType: false,
			success: function(result){
				if(result.status === "Registration Successful!"){
					browserHistory.push('/login');
				}else{
					alert('some error occured');
				}
	    	},
	    	error: (status) => {
	    		var res = JSON.parse(status.responseText);
	    		this.setState({'showError': res.err.message})
	    	}
	    });

		console.log(this.state)
	}

	componentDidMount(){
		if(!properties.userDetails){
			$.ajax({
				url: properties.users+'/'+window.sessionStorage.getItem('userId'),
				method: 'get',
				success: (result) => {
					properties.userDetails = result;
					this.setState({userDetails: result});
					this.setState({'birthMonth': result.birthMonth});
					this.setState({'location': result.location});
		    	},
		    	error: (status)=>{
		    		var res = JSON.parse(status.responseText);
		    		this.setState({'showError': res.err.message})
		    	}
		    });
		}else{
			this.setState({userDetails: properties.userDetails});
			this.setState({'birthMonth': properties.userDetails.birthMonth});
			this.setState({'location': properties.userDetails.location});
		}
	}

	render(){
		return(
			<div className="height100">
				<TopNav path={this.props.routes[this.props.routes.length-1].path} />
				<div className="loginBox clearfix">
					<h3>Hello, {this.state.userDetails.firstName} {this.state.userDetails.lastName}</h3>
					{this.state.showError ?
	 					<div className="error">
	 						{this.state.showError}
	 					</div>: null
					}
					<form onSubmit={this.updateProfile}>

						<div className="control">
							<label>Username: </label>
							<span>{this.state.userDetails.username}</span>
						</div>

						<div className="control birthday clearfix">
							<label htmlFor="birthday">Birthday</label>

							{this.state.isEdit ? 
								<div className="wrap-inline clearfix">
									<Select
									    name="birthMonth"
									    value={this.state.birthMonth}
									    options={properties.monthOptions}
									    onChange={this.monthSelect}
									    className="select-inline"
									/>
									<input className="input input-inline" id="day" ref="birthDay" defaultValue={this.state.userDetails.birthDay} type="text" />
									<input className="input input-inline" id="year" ref="birthYear" defaultValue={this.state.userDetails.birthYear} type="text" />
								</div>
								:
								<span>{this.state.userDetails.birthDay}-{this.state.userDetails.birthMonth}-{this.state.userDetails.birthYear}</span>
							}
						</div>

						<div className="control">
							<label htmlFor="gender">Gender</label>
							<span>{this.state.userDetails.gender}</span>
						</div>

						<div className="control">
							<label htmlFor="mobile">Mobile</label>
							
							{this.state.isEdit ? 
								<input className="input" id="mobile" ref="mobile" defaultValue={this.state.userDetails.mobile} type="text" />
								:
								<span>{this.state.userDetails.mobile}</span>
							}	
						</div>

						<div className="control">
							<label htmlFor="email">Email</label>
							
							{this.state.isEdit ? 
								<input className="input" id="email" ref="email" defaultValue={this.state.userDetails.email} type="email" />
								:
								<span>{this.state.userDetails.email}</span>
							}
						</div>

						<div className="control">
							<label htmlFor="location">Location</label>
							
							{this.state.isEdit ? 
								<Select
								    name="location"
								    value={this.state.location}
								    options={properties.locationOptions}
								    onChange={this.locationSelect}
								/>
								:
								<span>{this.state.userDetails.location}</span>
							}
						</div>

						<div className="control">
							{this.state.isEdit ? 
								<div>
									<button type="submit" onClick={this.updateProfile}>Update</button>
									<button className="btnCancel" type="button" onClick={(e) => {e.preventDefault(); this.setState({'isEdit' : false})}}>Cancel</button>
								</div>
								:
								<button type="button" onClick={(e) => {e.preventDefault(); this.setState({'isEdit' : true})}}>Edit details</button>
							}	
							
						</div>

					</form>



					
				</div>
			</div>
		)
	}
}
import React, {Component} from 'react';
import $ from 'jquery';
import properties from '../config';
import Select from 'react-select';
import { browserHistory } from 'react-router';
import 'react-select/dist/react-select.css';

require('../../scss/login.scss');

export default class Login extends Component{
	constructor(props){
		super(props);
		this.registerMe = this.registerMe.bind(this);
		this.myProfilePic = this.myProfilePic.bind(this);
		this.monthSelect = this.monthSelect.bind(this);
		this.genderSelect = this.genderSelect.bind(this);
		this.locationSelect = this.locationSelect.bind(this);

		this.state = {
			'showError': false
		};

		this.form = [
			'firstName', 'lastName', 'username', 'password', {type: 'birthMonth'}, 'birthDay',
			'birthYear', {type: 'gender'}, 'mobile', 'email', {type: 'location'} 
		]
	}

	myProfilePic(event){
		this.myProfilePicFile = event.target.files[0];
	}

	monthSelect(month){
		this.setState({birthMonth: month});
	}

	genderSelect(gender){
		this.setState({gender: gender});
	}

	locationSelect(location){
		this.setState({location: location});
	}

	registerMe(ev){
		ev.preventDefault();
		let formData = new FormData();
		formData.append("profilePic", this.myProfilePicFile);
		formData.append("admin" , this.refs.admin.checked);

		this.form.map((field) => {
			if(typeof field === 'object'){
				formData.append(field.type , this.state[field.type].value);
			}else{
				formData.append(field , this.refs[field].value);
			}
		});

		$.ajax({
			url: properties.users+'/register',
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
	}

	render(){
		return(
			<div className="loginBox clearfix">
				<h3>Register</h3>

				{this.state.showError ?
 					<div className="error">
 						{this.state.showError}
 					</div>: null
				}
				<form onSubmit={this.registerMe}>
					<div className="control">
						<label htmlFor="firstName">Name</label>
						<div className="wrap-inline">
							<input className="input input-inline" id="firstName" ref="firstName" placeholder="First Name" type="text" />
							<input className="input input-inline" id="lastName" ref="lastName" placeholder="Last Name" type="text" />
						</div>
					</div>
					<div className="control">
						<label htmlFor="username">Choose your username</label>
						<input className="input" id="username" ref="username" type="text" />
					</div>
					<div className="control">
						<label htmlFor="password">Password</label>
						<input className="input" id="password" ref="password" type="password" />
					</div>

					<div className="control birthday clearfix">
						<label htmlFor="birthday">Birthday</label>
						<div className="wrap-inline clearfix">
							<Select
							    name="birthMonth"
							    value={this.state.birthMonth}
							    options={properties.monthOptions}
							    onChange={this.monthSelect}
							    className="select-inline"
							/>
							<input className="input input-inline" id="day" ref="birthDay" placeholder="Day" type="text" />
							<input className="input input-inline" id="year" ref="birthYear" placeholder="Year" type="text" />
						</div>
					</div>

					<div className="control">
						<label htmlFor="gender">Gender</label>
						<Select
						    name="gender"
						    value={this.state.gender}
						    options={properties.genderOptions}
						    onChange={this.genderSelect}
						/>
					</div>

					<div className="control">
						<label htmlFor="mobile">Mobile</label>
						<input className="input" id="mobile" ref="mobile" placeholder="+91-9XXXXXXXXX" type="text" />
					</div>

					<div className="control">
						<label htmlFor="email">Email</label>
						<input className="input" id="email" ref="email" placeholder="abc@xyz.com" type="email" />
					</div>

					<div className="control">
						<label htmlFor="location">Location</label>
						<Select
						    name="location"
						    value={this.state.location}
						    options={properties.locationOptions}
						    onChange={this.locationSelect}
						/>
					</div>

					<div className="control">
						<label htmlFor="profilePic">Choose your profile pic</label>
						<input type="file" id="profilePic" className="inputClass" onChange={this.myProfilePic} />
		            </div>

					<div className="control">
						<label htmlFor="admin">
							<input className="input" id="admin" ref="admin" type="checkbox" /> isAdmin?
						</label>
					</div>

					<p className="control clearfix">
						<button type="submit" onClick={this.registerMe}>Register</button>
					</p>
				</form>
			</div>
		)
	}
}
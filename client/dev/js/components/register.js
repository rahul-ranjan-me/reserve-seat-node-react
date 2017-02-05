import React, {Component} from 'react';
import $ from 'jquery';
import properties from '../config';

require('../../scss/login.scss');

export default class Login extends Component{
	constructor(props){
		super(props);
		this.registerMe = this.registerMe.bind(this);
		this.myProfilePic = this.myProfilePic.bind(this);
		this.state = {
			'showError': false
		}
	}

	myProfilePic(event){
		this.myProfilePicFile = event.target.files[0];
	}

	registerMe(){
		let formData = new FormData();
		formData.append("profilePic", this.myProfilePicFile);
		formData.append("username" , this.refs.username.value);
		formData.append("password" , this.refs.password.value);
		formData.append("admin" , this.refs.isAdmin.checked);
		formData.append("name" , this.refs.name.value);			
		$.ajax({
			url: properties.users+'/register',
			method: 'post',
			data : formData,
			processData: false,
    		contentType: false,
			success: function(result){
				if(result.status === "Registration Successful!"){
					window.location.href = "/login";
				}else{
					alert('some error occured');
				}
	    	},
	    	error: (status)=>{
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
				<p>
					<label htmlFor="username">
						<input id="username" ref="username" placeholder="Username" type="text" />
					</label>
				</p>
				<p>
					<label htmlFor="password">
						<input id="password" ref="password" placeholder="Password" type="password" />
					</label>
				</p>
				<p>
					<label htmlFor="name">
						<input id="name" ref="name" placeholder="Name" type="text" />
					</label>
				</p>
				<div className="profilePic">
					 <input type="file" className="inputClass" onChange={this.myProfilePic} />
	            </div>
				<p>
					<label htmlFor="isAdmin">
						<input id="isAdmin" ref="isAdmin" type="checkbox" /> isAdmin?
					</label>
				</p>
				<p className="clearfix">
					<button type="submit" onClick={this.registerMe}>Register</button>
				</p>
			</div>
		)
	}
}
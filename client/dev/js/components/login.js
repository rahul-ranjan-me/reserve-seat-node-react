import React, {Component} from 'react';
import { Link } from 'react-router';
import $ from 'jquery';
import properties from '../config';


require('../../scss/login.scss');

export default class Login extends Component{
	constructor(props){
		super(props);
		this.loginMe = this.loginMe.bind(this);
		this.state = {
			'showError': false
		}
	}

	loginMe(){
		$.ajax({
			url: properties.users+'/login',
			method: 'post',
			data : {
				username: this.refs.username.value,
				password: this.refs.password.value
			},
			success: (result)=>{
				this.setState({'showError': false})
				if(result.success){
					window.sessionStorage.setItem('token', result.token);
					window.location.href = "/chooseSeat";
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
				<h3>Login</h3>

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
				<p className="clearfix">
					<button type="submit" onClick={this.loginMe}>Login</button>
				</p>

				<div className="register clearfix">
					<Link to="register">Click here to register</Link>
				</div>
			</div>
		)
	}
}
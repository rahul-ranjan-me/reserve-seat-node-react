import React, {Component} from 'react';
import { Link } from 'react-router';
import $ from 'jquery';
import { browserHistory } from 'react-router';
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
					window.sessionStorage.setItem('userId', result.id);
					properties.userDetails = result.userDetails;
					browserHistory.push('/chooseSeat');
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

				<div className="control">
					<label htmlFor="username">
						<input className="input" id="username" ref="username" placeholder="Username" type="text" />
					</label>
				</div>
				<div className="control">
					<label htmlFor="password">
						<input className="input" id="password" ref="password" placeholder="Password" type="password" />
					</label>
				</div>
				<div className="control clearfix">
					<button type="submit" onClick={this.loginMe}>Login</button>
				</div>

				<div className="register clearfix">
					<Link to="register">Click here to register</Link>
				</div>
			</div>
		)
	}
}
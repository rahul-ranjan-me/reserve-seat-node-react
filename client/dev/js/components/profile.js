import React, {Component} from 'react';
import $ from 'jquery';
import properties from '../config';
import TopNav from '../structure/topNav';

require('../../scss/profile.scss');

export default class Profile extends Component{
	constructor(props){
		super(props);
		
		this.state = {
			userDetails : {
				id: '',
				admin: '',
				birthday: '',
				birthMonth: '',
				birthYear: '',
				email: '',
				firstName: '',
				lastName: '',
				gender: '',
				location: '',
				mobile: '',
				username: ''
			}
		}
	}

	componentDidMount(){
		if(!properties.userDetails){
			$.ajax({
				url: properties.users+'/'+window.sessionStorage.getItem('userId'),
				method: 'get',
				success: (result) => {
					properties.userDetails = result;
					this.setState({userDetails: result});
		    	},
		    	error: (status)=>{
		    		var res = JSON.parse(status.responseText);
		    		this.setState({'showError': res.err.message})
		    	}
		    });
		}else{
			this.setState({userDetails: properties.userDetails});
		}
	}

	render(){
		return(
			<div className="height100">
				<TopNav path={this.props.routes[this.props.routes.length-1].path} />
				<div className="profile clearfix">
					<p>
						<label>Name: </label>
						<span>{this.state.userDetails.firstName} {this.state.userDetails.lastName}</span>
						<input type="text" ref={this.refs.firstName} value={this.state.userDetails.firstName} />
						<input type="text" ref={this.refs.lastName} value={this.state.userDetails.lastName} />
					</p>
					<p>
						<label>Username: </label>
						<span>{this.state.userDetails.username}</span>
					</p>
					<p>
						<button type="button">Update</button>
					</p>
				</div>
			</div>
		)
	}
}
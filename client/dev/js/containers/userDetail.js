import React, {Component} from 'react';
import {connect} from 'react-redux';

class UserDetail extends Component {

	render(){
		if(!this.props.user){
			return (
				<h3>Select a user</h3>
			)
		}

		return (
			<div className="userDetail">
				<h3>{this.props.user.first} {this.props.user.last}</h3>
				<h4>{this.props.user.age}</h4>
				<h4>{this.props.user.description}</h4>
			</div>			
		)
	}
}

function mapStateToProps(state){
	return {
		user: state.activeUser
	}
}
 
export default connect(mapStateToProps)(UserDetail);
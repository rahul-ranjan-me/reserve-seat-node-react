import React, {Component} from 'react';
import ReactDom from 'react-dom';
import Header from './structure/header';


require('../scss/common.scss');

export default class Layout extends React.Component {
	constructor(props){
		super(props);
	}

	render(){
		return (
			<div>
				<Header />
				<div className="main-container clearfix">
					{this.props.children}
				</div>
			</div>
		);
	}
}
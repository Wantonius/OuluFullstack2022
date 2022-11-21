import React from 'react';

export default class HelloClass extends React.Component {

	render() {
		let name = "World";
		if(this.props.name) {
			name = this.props.name;
		}
		return(
			<h2>Hello from class,{name}</h2>
		) 
	}
}
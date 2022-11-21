import React from 'react';

export default class SquareClass extends React.Component {

	render() {
		let squareStyle = {
			backgroundColor:this.props.color,
			height:150
		}
		return(
			<div style={squareStyle}></div>
		)
	}
}

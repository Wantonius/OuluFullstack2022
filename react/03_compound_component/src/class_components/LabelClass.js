import React from 'react';

export default class LabelClass extends React.Component {

	render() {
		let labelStyle = {
			fontFamily:"sans-serif",
			fontWeight:"bold",
			padding:13,
			margin:0
		}
		return (
			<p style={labelStyle}
			onClick={this.props.onColorChange}
			>{this.props.color}</p>
		)
	}
}
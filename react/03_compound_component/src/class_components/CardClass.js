import React from 'react';
import LabelClass from './LabelClass';
import SquareClass from './SquareClass';

export default class CardClass extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			color:"red"
		}
	}

	onColorChange = () => {
		let color = "#";
		const letters = "ABCDEF0123456789";
		for(let i=0;i<6;i++) {
			let temp = Math.floor(Math.random()*16);
			color = color + letters[temp];
		}
		this.setState({
			color:color
		})
	}
	
	render() {
		let cardStyle = {
			height:200,
			width:150,
			backgroundColor:"#FFF",
			WebkitFilter:"drop-shadow(0px 0px 5px #666)",
			filter:"drop-shadow(0px 0px 5px #666)"
		}
		return(
			<div style={cardStyle}>
				<SquareClass color={this.state.color}/>
				<LabelClass color={this.state.color} onColorChange={this.onColorChange}/>
			</div>
			)		
	}
}
import {connect} from 'react-redux';
import React from 'react';

class ClassCount extends React.Component {

	increment = () => {
		console.log("ClassCount - increment");
		this.props.dispatch({
			type:"INCREMENT"
		})
	}
	
	decrement = () => {
		console.log("ClassCount - decrement");
		this.props.dispatch({
			type:"DECREMENT"
		})
	}

	render() {
		return(
			<div>
				<h2>Class count:{this.props.count}</h2>
				<button onClick={this.increment}>Increment</button>
				<button onClick={this.decrement}>Decrement</button>
			</div>
		)
	} 
}

const mapStateToProps = (state) => {
	console.log("ClassCount - mapStateToProps",state);
	return {
		count:state.count
	}
}

export default connect(mapStateToProps)(ClassCount);
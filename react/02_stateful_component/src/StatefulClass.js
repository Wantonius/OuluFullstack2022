import React from 'react';

export default class StatefulClass extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
			seconds:0
		}
		this.interval = 0;
	}
	
	componentDidMount() {
		this.interval = setInterval(() => {
			this.setState((state) => {
				return {
					seconds:state.seconds+1
				}
			})
		},1000)
	}
	
	componentWillUnmount() {
		clearInterval(this.interval);
	}
	
	render() {
		return (
			<h1>{this.state.seconds} seconds since you entered this class</h1>
		)
	}
}
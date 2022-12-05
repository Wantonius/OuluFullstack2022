import React from 'react';

interface State {
	seconds:number,
	interval:ReturnType<typeof setInterval>|null
}

export default class StatefulClass extends React.Component<{}|State> {
	
	state:State = {
		seconds:0,
		interval:null
	}
		
	componentDidMount() {
		let tempInterval = setInterval(this.startTimer,1000);
		this.setState({
			interval:tempInterval
		})
	}
	
	componentWillUnmount() {
		if(this.state.interval) {
			clearInterval(this.state.interval);
		}
	}
	
	startTimer = () => {
		this.setState({
			seconds:this.state.seconds+1
		})
	}
	render() {
		return(
			<h2>{this.state.seconds} since you entered the page</h2>
		)
	}
}
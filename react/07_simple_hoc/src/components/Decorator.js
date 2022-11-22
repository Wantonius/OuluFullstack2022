import React from 'react';

const Decorator = (Component) => {
	return class ColorDecorator extends React.Component {
		
		constructor(props) {
			super(props);
			this.state = {
				color:"red"
			}
		}
		
		update = (event) => {
			this.setState({
				color:event.target.value
			})
		}
		
		render() {
			return(
				<>
					<Component {...this.props} color={this.state.color}/>
					<br/>
					<input type="text"
							name="colorpicker"
							onChange={this.update}
							value={this.state.color}/>
					<br/>
				</>
			)
		}
	}
}

export default Decorator;
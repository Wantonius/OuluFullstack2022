import React from 'react';
import {ThemeContext} from '../context/ThemeContext';

export default class ThemeButton extends React.Component {
	
	render() {
		return (
			<ThemeContext.Consumer>
			{theme => <button style={{
				color:theme.color,
				backgroundColor:theme.backgroundColor
			}} onClick={() => this.props.toggleTheme()}>Toggle Button</button>}
			</ThemeContext.Consumer>
		)
	}
}
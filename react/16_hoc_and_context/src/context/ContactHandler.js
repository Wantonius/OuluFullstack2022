import React from 'react';
import ContactContext from './ContactContext';

const ContactHandler = (Component) => {
	return class ContactHandler extends React.Component {
		render() {
			return(
				<ContactContext.Consumer>
				{value => <Component {...this.props} {...value}/>}
				</ContactContext.Consumer>
			)
		}
	}
}

export default ContactHandler;
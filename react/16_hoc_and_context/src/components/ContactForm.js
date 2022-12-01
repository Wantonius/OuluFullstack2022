import React from 'react';
import ContactHandler from '../context/ContactHandler';

class ContactForm extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
			firstname:"",
			lastname:"",
			email:"",
			phone:""
		}
	}
	
	onChange = (event) => {
		this.setState((state) => {
			return {
				[event.target.name]:event.target.value
			}
		})
	};
	
	onSubmit = (event) => {
		event.preventDefault();
		let contact = {
			...this.state
		}
		this.props.addContact(contact);
		this.setState({
			firstname:"",
			lastname:"",
			email:"",
			phone:""	
		})
	}
	
	render() {
		return(
		<form onSubmit={this.onSubmit}>
			<label htmlFor="firstname">First Name</label>
			<input type="text"
					name="firstname"
					id="firstname"
					onChange={this.onChange}
					value={this.state.firstname}/>
			<br/>
			<label htmlFor="lastname">Last Name</label>
			<input type="text"
					name="lastname"
					id="lastname"
					onChange={this.onChange}
					value={this.state.lastname}/>
			<br/>
			<label htmlFor="email">Email</label>
			<input type="email"
					name="email"
					id="email"
					onChange={this.onChange}
					value={this.state.email}/>
			<br/>
			<label htmlFor="phone">Phone</label>
			<input type="tel"
					name="phone"
					id="phone"
					onChange={this.onChange}
					value={this.state.phone}/>
			<br/>
			<input type="submit" value="Add Contact"/>
		</form>
		)
	}
}

export default ContactHandler(ContactForm);
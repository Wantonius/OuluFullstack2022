import React from 'react';
import ContactContext from './ContactContext';

export default class ContactProvider extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
			list:[],
			id:100
		}
	}
	
	addContact = (item) => {
		item.id = this.state.id
		this.setState((state) => {
			return {
				list:this.state.list.concat(item),
				id:this.state.id+1
			}
		})
	}
	
	removeContact = (id) => {
		this.setState((state) => {
			let tempList = this.state.list.filter(item => item.id !== id)
			return {
				list:tempList
			}
		})
	}
	
	render() {
		return(
			<ContactContext.Provider value={{
				addContact:this.addContact,
				removeContact:this.removeContact,
				list:this.state.list
			}}>
				{this.props.children}
			</ContactContext.Provider>
		)
	}
}
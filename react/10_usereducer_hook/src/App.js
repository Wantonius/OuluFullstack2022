import logo from './logo.svg';
import './App.css';
import {useReducer} from 'react';
import ContactForm from './components/ContactForm';
import ContactList from './components/ContactList';

const initialState = {
	list:[],
	id:100
}

const listReducer = (state,action) => {
	let tempList = [];
	switch(action.type) {
		case "ADD_CONTACT":
			action.contact.id = state.id;
			tempList = state.list.concat(action.contact);
			return {
				list:tempList,
				id:state.id+1
			}
		case "REMOVE_CONTACT":
			tempList = state.list.filter(contact => contact.id !== action.id)
			return {
				...state,
				list:tempList
			}
		default:
			return state;
	}
}

function App() {
	
	const [state,dispatch] = useReducer(listReducer,initialState);
	
	const addContact = (contact) => {
		dispatch({
			type:"ADD_CONTACT",
			contact:contact
		})
	}
	
	const removeContact = (id) => {
		dispatch({
			type:"REMOVE_CONTACT",
			id:id
		})
	}
	return (
		<div className="App">
			<ContactForm addContact={addContact}/>
			<hr/>
			<ContactList list={state.list} removeContact={removeContact}/>
		</div>
	);
}

export default App;

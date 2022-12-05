import React,{useState} from 'react';
import logo from './logo.svg';
import './App.css';
import ShoppingItem from './models/ShoppingItem';
import ShoppingForm from './components/ShoppingForm';
import ShoppingList from './components/ShoppingList';

interface State {
	list:ShoppingItem[];
	id:number;
}

function App() {
	
	const [state,setState] = useState<State>({
		list:[],
		id:100
	})
	
	const addItem = (item:ShoppingItem) => {
		setState((state) => {
			item.id = state.id;
			let tempList = state.list.concat(item);
			return {
				list:tempList,
				id:state.id+1
			}
		})
	}

	const removeItem = (id:number) => {
		setState((state) => {
			let tempList = state.list.filter(item => item.id !== id);
			return {
				...state,
				list:tempList
			}
		})
	}
	
	return (
		<div className="App">
			<ShoppingForm addItem={addItem}/>
			<hr/>
			<ShoppingList list={state.list} removeItem={removeItem}/>
		</div>
	);
}

export default App;

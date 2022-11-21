import {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import NameForm from './NameForm';
function App() {
	
	const [state,setState] = useState({
		message:"No greeting yet"
	})
	
	const setGreeting = (name) => {
		setState({
			message:"Hello "+name
		})
	}
	
	return (
		<div className="App">
			<NameForm setGreeting={setGreeting}/>
			<hr/>
			<h2>{state.message}</h2>
		</div>
	);
}

export default App;

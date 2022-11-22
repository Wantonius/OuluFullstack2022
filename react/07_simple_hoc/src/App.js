import logo from './logo.svg';
import './App.css';
import {useState} from 'react';
import FirstButton from './components/FirstButton';
import SecondButton from './components/SecondButton';

function App() {
	
	const [state,setState] = useState({
		message:""
	})
	
	const callback = (message) => {
		setState({
			message:message
		})
	}
	
	return (
		<div className="App">
				<p>Message from clicked button says:{state.message}</p>
				<FirstButton callback={callback}/>
				<SecondButton callback={callback}/>
		</div>
  );
}

export default App;

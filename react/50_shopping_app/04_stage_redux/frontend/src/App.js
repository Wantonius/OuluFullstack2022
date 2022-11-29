import logo from './logo.svg';
import './App.css';
import {useEffect,useState} from 'react';
import ShoppingForm from './components/ShoppingForm';
import ShoppingList from './components/ShoppingList';
import Navbar from './components/Navbar';
import LoginPage from './components/LoginPage';
import {Route,Routes,Navigate} from 'react-router-dom';
import {useSelector} from 'react-redux';

function App() {
	
	const state = useSelector(state => state);

	
	//RENDERING
	
	let messageArea = <h3> </h3>
	if(state.login.loading) {
		messageArea = <h3>Loading ...</h3>
	}
	let error = "";
	if(state.shopping.error) {
		error = state.shopping.error;
	}
	if(state.login.error) {
		error = state.login.error;
	}
	if(error) {
		messageArea = <h3>{error}</h3>
	}
	let tempRender = <Routes>
						<Route exact path="/" element={<LoginPage />}/>
						<Route path="*" element={<Navigate to="/"/>}/>
					</Routes>
	if(state.login.isLogged) {
		tempRender = <Routes>
				<Route path="/list" element={<ShoppingList />}/>
				<Route path="/form" element={<ShoppingForm />}/>
				<Route path="*" element={<Navigate to="/list"/>}/>
			</Routes>
	}
	
	return (
		<div className="App">
			<Navbar />
			{messageArea}
			<hr/>
			{tempRender}
		</div>
	);
}

export default App;

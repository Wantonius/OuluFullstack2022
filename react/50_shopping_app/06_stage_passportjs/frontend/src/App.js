import logo from './logo.svg';
import './App.css';
import {useEffect} from 'react';
import ShoppingForm from './components/ShoppingForm';
import ShoppingList from './components/ShoppingList';
import Navbar from './components/Navbar';
import LoginPage from './components/LoginPage';
import {Route,Routes,Navigate} from 'react-router-dom';
import useAction from './hooks/useAction';
import useAppState from './hooks/useAppState';
function App() {

	const {isLogged,error,loading} = useAppState();
	const {getList} = useAction();
	
	useEffect(() => {
		if(isLogged) {
			getList();
		}
	},[isLogged])
	//RENDERING
	
	let messageArea = <h3> </h3>
	if(loading) {
		messageArea = <h3>Loading ...</h3>
	}
	if(error) {
		messageArea = <h3>{error}</h3>
	}
	let tempRender = <Routes>
						<Route exact path="/" element={<LoginPage />}/>
						<Route path="*" element={<Navigate to="/"/>}/>
					</Routes>
	if(isLogged) {
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

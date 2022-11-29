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
	
	const [state,setState] = useState({
		list:[],
	});
	
	const appState = useSelector(state => state);
	
	const [urlRequest,setUrlRequest] = useState({
		url:"",
		request:{},
		action:""
	})
	
	//HELPER FUNCTIONS
	
	const setError = (error) => {

	}
	
	const setLoading = (loading) => {

	}
	
	const clearState = () => {
		setState((state) => {
			let tempState = {
				list:[]
			}
			saveToStorage(tempState);
			return tempState;
		})
	}
	
	const saveToStorage = (state) => {
		sessionStorage.setItem("state",JSON.stringify(state));
	}
	
	//USEEFFECT
	

	
	useEffect(() => {
		
		const fetchData = async () => {
			if(!urlRequest.url) {
				return;
			}
			setLoading(true);
			const response = await fetch(urlRequest.url,urlRequest.request);
			setLoading(false);
			if(!response) {
				console.log("Server did not respond");
				return;
			}
			if(response.ok) {
				switch(urlRequest.action) {
					case "getlist":
						const data = await response.json();
						if(!data) {
							console.log("Failed to parse shopping data!");
							return
						}
						setState((state) => {
							let tempState = {
								...state,
								list:data
							}
							saveToStorage(tempState);
							return tempState;
						})
						return;
					case "additem":
						getList();
						return;
					case "removeitem":
						getList();
						return;
					case "edititem":
						getList();
						return;
					case "register":
						setError("Register success!");
						return;
					case "login":
						const loginData = await response.json();
						if(!loginData) {
							setError("Failed to parse login information. Try again later.");
							return;
						}
						setState((state) => {
							let tempState = {
								...state,
								token:loginData.token,
								isLogged:true
							}
							saveToStorage(tempState);
							return tempState;
						})
						getList(loginData.token);
						return;
					case "logout":
						clearState();
						return;
					default:
						return;
				}				
			} else {
				if(response.status === 403) {
					clearState();
					setError("Your session has expired. Logging you out!");
					return;
				}
				switch(urlRequest.action) {
					case "getlist":
						setError("Failed to fetch shopping data. Server responded with a status "+response.status+" "+response.statusText)
						return;
					case "additem":
						setError("Failed to add new item. Server responded with a status "+response.status+" "+response.statusText)
						return;
					case "removeitem":
						setError("Failed to remove item. Server responded with a status "+response.status+" "+response.statusText)
						return;
					case "edititem":
						setError("Failed to edit item. Server responded with a status "+response.status+" "+response.statusText)
						return;
					case "register":
						if(response.status === 409) {
							setError("Username is already in use");
							return;
						}
						setError("Register failed. Server responded with a status "+response.status+" "+response.statusText)
						return;
					case "login":
						setError("Login failed. Server responded with a status "+response.status+" "+response.statusText)
						return;
					case "logout":
						clearState();
						setError("Server responded with an error. Logging you out.");
						return;
					default:
						return;
				}
			}
		}
		
		fetchData();
		
	},[urlRequest]);
	
	//LOGIN API
	

	

	
	
	//SHOPPING API
	
	const getList = (token) => {
		let tempToken = appState.token;
		if(token) {
			tempToken = token
		}
		setUrlRequest({
			url:"/api/shopping",
			request:{
				method:"GET",
				headers:{"token":tempToken}
			},
			action:"getlist"
		})
	}
	
	const addItem = (item) => {
		setUrlRequest({
			url:"/api/shopping",
			request:{
				method:"POST",
				headers:{"Content-Type":"application/json",
						"token":appState.token},
				body:JSON.stringify(item)
			},
			action:"additem"
		})
	}
	
	const removeItem = (id) => {
		setUrlRequest({
			url:"/api/shopping/"+id,
			request:{
				method:"DELETE",
				headers:{"token":appState.token}
			},
			action:"removeitem"
		})
	}
	
	const editItem = (item) => {
		setUrlRequest({
			url:"/api/shopping/"+item.id,
			request:{
				method:"PUT",
				headers:{
					"Content-Type":"application/json",
					"token":appState.token
				},
				body:JSON.stringify(item)
			},
			action:"edititem"
		})
	}
	
	//RENDERING
	
	let messageArea = <h3> </h3>
	if(appState.loading) {
		messageArea = <h3>Loading ...</h3>
	}
	if(appState.error) {
		messageArea = <h3>{state.error}</h3>
	}
	let tempRender = <Routes>
						<Route exact path="/" element={<LoginPage />}/>
						<Route path="*" element={<Navigate to="/"/>}/>
					</Routes>
	if(appState.isLogged) {
		tempRender = <Routes>
				<Route path="/list" element={<ShoppingList list={state.list} removeItem={removeItem} editItem={editItem}/>}/>
				<Route path="/form" element={<ShoppingForm addItem={addItem}/>}/>
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

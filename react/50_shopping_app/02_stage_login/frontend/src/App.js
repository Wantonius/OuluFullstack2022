import logo from './logo.svg';
import './App.css';
import {useEffect,useState} from 'react';
import ShoppingForm from './components/ShoppingForm';
import ShoppingList from './components/ShoppingList';
import Navbar from './components/Navbar';
import LoginPage from './components/LoginPage';
import {Route,Routes,Navigate} from 'react-router-dom';
function App() {
	
	const [state,setState] = useState({
		list:[],
		isLogged:false,
		token:"",
		loading:false,
		error:""
	});
	
	const [urlRequest,setUrlRequest] = useState({
		url:"",
		request:{},
		action:""
	})
	
	//HELPER FUNCTIONS
	
	const setError = (error) => {
		setState((state) => {
			let tempState = {
				...state,
				error:error
			}
			saveToStorage(tempState);
			return tempState;
		})
	}
	
	const setLoading = (loading) => {
		setState((state) => {
			return {
				...state,
				loading:loading,
				error:""
			}
		})
	}
	
	const clearState = () => {
		setState((state) => {
			let tempState = {
				list:[],
				isLogged:false,
				loading:false,
				error:"",
				token:""
			}
			saveToStorage(tempState);
			return tempState;
		})
	}
	
	const saveToStorage = (state) => {
		sessionStorage.setItem("state",JSON.stringify(state));
	}
	
	//USEEFFECT
	
	useEffect(() =>	{
		if(sessionStorage.getItem("state")) {
			let tempState = JSON.parse(sessionStorage.getItem("state"));
			setState(tempState)
			if(tempState.isLogged) {
				getList(tempState.token);
			}
		}
	} ,[]);
	
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
	
	const register = (user) => {
		setUrlRequest({
			url:"/register",
			request:{
				method:"POST",
				headers:{"Content-Type":"application/json"
				},
				body:JSON.stringify(user)
			},
			action:"register"
		})
	}
	
	const login = (user) => {
		setUrlRequest({
			url:"/login",
			request:{
				method:"POST",
				headers:{"Content-Type":"application/json"
				},
				body:JSON.stringify(user)
			},
			action:"login"
		})
	}
	
	const logout = (user) => {
		setUrlRequest({
			url:"/logout",
			request:{
				method:"POST",
				headers:{"Content-Type":"application/json",
						 "token":state.token}
			},
			action:"logout"
		})
	}	
	//SHOPPING API
	
	const getList = (token) => {
		let tempToken = state.token;
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
						"token":state.token},
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
				headers:{"token":state.token}
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
					"token":state.token
				},
				body:JSON.stringify(item)
			},
			action:"edititem"
		})
	}
	
	//RENDERING
	
	let messageArea = <h3> </h3>
	if(state.loading) {
		messageArea = <h3>Loading ...</h3>
	}
	if(state.error) {
		messageArea = <h3>{state.error}</h3>
	}
	let tempRender = <Routes>
						<Route exact path="/" element={<LoginPage register={register} login={login} setError={setError}/>}/>
						<Route path="*" element={<Navigate to="/"/>}/>
					</Routes>
	if(state.isLogged) {
		tempRender = <Routes>
				<Route path="/list" element={<ShoppingList list={state.list} removeItem={removeItem} editItem={editItem}/>}/>
				<Route path="/form" element={<ShoppingForm addItem={addItem}/>}/>
				<Route path="*" element={<Navigate to="/list"/>}/>
			</Routes>
	}
	
	return (
		<div className="App">
			<Navbar logout={logout} isLogged={state.isLogged}/>
			{messageArea}
			<hr/>
			{tempRender}
		</div>
	);
}

export default App;

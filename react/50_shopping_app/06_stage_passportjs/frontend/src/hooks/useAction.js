import {useState,useEffect,useContext} from 'react';
import ActionContext from '../context/ActionContext';
import * as actionConstants from '../types/actionConstants';
import useAppState from './useAppState';

const useAction = () => {
	
	const {dispatch} = useContext(ActionContext);
	
	const [state,setState] = useState({
		url:"",
		request:{},
		action:""
	})
	
	const {token} = useAppState();
	
	//contact backend using useEffect

	useEffect(() => {
		
		const contactBackend = async () => {
			if(!state.url) {
				return;
			}
			dispatch({
				type:actionConstants.LOADING
			})
			let response = await fetch(state.url,state.request);
			dispatch({
				type:actionConstants.STOP_LOADING
			})
			if(!response) {
				dispatch({
					type:actionConstants.LOGOUT_FAILED,
					error:"There was an error with the connection. Server does not respond. Logging you out"
				})
				return;
			}
			if(response.ok) {
				switch(state.action) {
					case "register":
						dispatch({
							type:actionConstants.REGISTER_SUCCESS
						})
						return;
					case "login":
						let data = await response.json();
						if(!data) {
							dispatch({
								type:actionConstants.LOGIN_FAILED,
								error:"Failed to parse login information."
							})
							return;
						}
						dispatch({
							type:actionConstants.LOGIN_SUCCESS,
							token:data.token
						})
						return;
					case "logout":
						dispatch({
							type:actionConstants.LOGOUT_SUCCESS
						})
						return;
					case "getlist":
						let list = await response.json();
						if(!list) {
							dispatch({
								type:actionConstants.FETCH_LIST_FAILED,
								error:"Failed to parse shopping information"
							})
							return;
						}
						dispatch({
							type:actionConstants.FETCH_LIST_SUCCESS,
							list:list
						})
						return;
					case "add":
						dispatch({
							type:actionConstants.ADD_ITEM_SUCCESS
						})
						getList();
						return;
					case "remove":
						dispatch({
							type:actionConstants.REMOVE_ITEM_SUCCESS
						})
						getList();
						return;
					case "edit":
						dispatch({
							type:actionConstants.EDIT_ITEM_SUCCESS
						})
						getList();
						return;
					default:
						return;
				}
			} else {
				if(response.status === 403) {
					dispatch({
						type:actionConstants.LOGOUT_FAILED,
						error:"Your session has expired. Logging you out."
					})
					return;
				}
				switch(state.action) {
					case "register":
						if(response.status === 409) {
							dispatch({
								type:actionConstants.REGISTER_FAILED,
								error:"Username already in use"
							})
						} else {
							dispatch({
								type:actionConstants.REGISTER_FAILED,
								error:"Register failed. Server responded with a status "+response.status+" "+response.statusText
							})	
						}
						return;
					case "login":
						dispatch({
							type:actionConstants.LOGIN_FAILED,
							error:"Login failed. Server responded with a status "+response.status+" "+response.statusText
						})	
						return;
					case "logout":
						dispatch({
							type:actionConstants.LOGOUT_FAILED,
							error:"Server responded with an error. Logging you out."
						})
						return;
					case "getlist":
						dispatch({
							type:actionConstants.FETCH_LIST_FAILED,
							error:"Fetch shopping list failed. Server responded with a status "+response.status+" "+response.statusText
						})
						return;
					case "add":
						dispatch({
							type:actionConstants.ADD_ITEM_FAILED,
							error:"Failed to add new item. Server responded with a status "+response.status+" "+response.statusText
						})
						return;
					case "remove":
						dispatch({
							type:actionConstants.REMOVE_ITEM_FAILED,
							error:"Failed to remove item. Server responded with a status "+response.status+" "+response.statusText
						})
						return;
					case "edit":
						dispatch({
							type:actionConstants.EDIT_ITEM_FAILED,
							error:"Failed to edit item. Server responded with a status "+response.status+" "+response.statusText
						})
						return;
					default:
						return;
				}
			}
		}
		
		contactBackend();
	},[state]);

	const register = (user) => {
		setState({
			url:"/register",
			request:{
				method:"POST",
				headers:{"Content-Type":"application/json"},
				body:JSON.stringify(user)
			},
			action:"register"
		
		})
	}
	
	const login = (user) => {
		setState({
			url:"/login",
			request:{
				method:"POST",
				headers:{"Content-Type":"application/json"},
				body:JSON.stringify(user)
			},
			action:"login"
		
		})
	}
	
	const logout = () => {
		setState({
			url:"/logout",
			request:{
				method:"POST",
				headers:{"token":token}
			},
			action:"logout"
		})
	}
	
	const getList = () => {
		setState({
			url:"/api/shopping",
			request:{
				method:"GET",
				headers:{"token":token}
			},
			action:"getlist"
		})
	}
	
	const add = (item) => {
		setState({
			url:"/api/shopping",
			request:{
				method:"POST",
				headers:{"Content-Type":"application/json",
				"token":token},
				body:JSON.stringify(item)
			},
			action:"add"
		})
	}
	
	const remove = (id) => {
		setState({
			url:"/api/shopping/"+id,
			request:{
				method:"DELETE",
				headers:{"token":token}
			},
			action:"remove"
		})
	}
	
	const edit = (item) => {
		setState({
			url:"/api/shopping/"+item.id,
			request:{
				method:"PUT",
				headers:{"Content-Type":"application/json",
				"token":token},
				body:JSON.stringify(item)
			},
			action:"edit"
		})
	}
	
	return {register,login,logout,getList,add,remove,edit};
}

export default useAction;
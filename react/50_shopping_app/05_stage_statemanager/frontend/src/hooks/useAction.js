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
					default:
						return;
				}
			} else {
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
	
	return {register};
}

export default useAction;
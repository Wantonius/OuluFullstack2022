import {logoutFailed,loading,stopLoading} from './loginActions';
import * as actionConstants from './actionConstants';

//ASYNC ACTION CREATORS

export const getList = (token) => {
	return async (dispatch) => {
		let request = {
			method:"GET",
			headers:{"token":token}
		}
		dispatch(loading());
		let response = await fetch("/api/shopping",request);
		dispatch(stopLoading());
		if(!response) {
			dispatch(fetchListFailed("Failed loading shopping information. Server never responded. Try again later."))
			return;
		}
		if(response.ok) {
			let list = await response.json();
			if(!list) {
				dispatch(fetchListFailed("Failed to parse shopping information. Try again later."))
				return;
			}
			dispatch(fetchListSuccess(list))
		} else {
			if(response.status === 403) {
				dispatch(logoutFailed("Your session has expired. Logging you out."));
				return;
			}
			dispatch(fetchListFailed("Failed to fetch shopping information. Server responded with a status "+response.status+" "+response.statusText));
		}
	}
}

//ACTION CREATORS

const fetchListSuccess = (list) => {
	return {
		type:actionConstants.FETCH_LIST_SUCCESS,
		list:list
	}
}

const fetchListFailed = (error) => {
	return {
		type:actionConstants.FETCH_LIST_FAILED,
		error:error
	}
}

const addItemSuccess = () => {
	return {
		type:actionConstants.ADD_ITEM_SUCCESS
	}
}

const addItemFailed = (error) => {
	return {
		type:actionConstants.ADD_ITEM_FAILED,
		error:error
	}
}

const removeItemSuccess = () => {
	return {
		type:actionConstants.REMOVE_ITEM_SUCCESS
	}
}

const removeItemFailed = (error) => {
	return {
		type:actionConstants.REMOVE_ITEM_FAILED,
		error:error
	}
}

const editItemSuccess = () => {
	return {
		type:actionConstants.EDIT_ITEM_SUCCESS
	}
}

const editItemFailed = (error) => {
	return {
		type:actionConstants.EDIT_ITEM_FAILED,
		error:error
	}
}
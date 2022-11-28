const initialState = {
	list:[],
	id:100
}

const contactReducer = (state = initialState, action) => {
	console.log("Contact Reducer, action",action);
	let tempList = [];
	switch(action.type) {
		case "ADD_CONTACT":
			action.contact.id = state.id;
			tempList = state.list.concat(action.contact);
			return {
				list:tempList,
				id:state.id+1
			}
		case "REMOVE_CONTACT":
			tempList = state.list.filter(contact => contact.id !== action.id)
			return {
				...state,
				list:tempList
			}
		default:
			return state;
	}
	
}

export default contactReducer;
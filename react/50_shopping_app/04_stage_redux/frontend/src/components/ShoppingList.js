import {useState} from 'react';
import Row from './Row';
import RemoveRow from './RemoveRow';
import EditRow from './EditRow';
import {useDispatch,useSelector} from 'react-redux';
import {getList,remove,edit} from '../actions/shoppingActions';

const ShoppingList = (props) => {
	
	const [state,setState] = useState({
		editIndex:-1,
		removeIndex:-1
	})
	
	const appState = useSelector(state => state);
	
	const dispatch = useDispatch();
	
	const changeMode = (mode,index) => {
		if(mode === "remove") {
			setState({
				removeIndex:index,
				editIndex:-1
			})			
		}
		if(mode === "edit") {
			setState({
				removeIndex:-1,
				editIndex:index
			})
		}
		if(mode === "cancel") {
			setState({
				removeIndex:-1,
				editIndex:-1
			})
		}
	}
	
	const removeItem = (id) => {
		dispatch(remove(appState.login.token,id));
		changeMode("cancel");
	}
	
	const editItem = (item) => {
		dispatch(edit(appState.login.token,item));
		changeMode("cancel");
	}

	let items = appState.shopping.list.map((item,index) => {
		if(state.editIndex === index) {
			return(
				<EditRow key={item.id} item={item} changeMode={changeMode} editItem={editItem}/>
			)
		}
		if(state.removeIndex === index) {
			return(
				<RemoveRow key={item.id} item={item} changeMode={changeMode} removeItem={removeItem}/>
			)
		}
		return (
			<Row key={item.id} item={item} changeMode={changeMode} index={index}/>
		)
	})
	
	return(
		<table className="table table-striped">
			<thead>
				<tr>
					<th>Type</th>
					<th>Count</th>
					<th>Price</th>
					<th>Remove</th>
					<th>Edit</th>
				</tr>
			</thead>
			<tbody>
			{items}
			</tbody>
		
		</table>
	)
}

export default ShoppingList;
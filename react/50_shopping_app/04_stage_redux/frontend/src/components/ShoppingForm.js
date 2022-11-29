import {useState} from 'react';
import {useSelector,useDispatch} from 'react-redux';
import {add} from '../actions/shoppingActions';
const ShoppingForm = (props) => {
	
	const [state,setState] = useState({
		type:"",
		count:0,
		price:0
	})
	
	const dispatch = useDispatch();
	const appState = useSelector(state => state);
	
	const onChange = (event) => {
		setState((state) => {
			return {
				...state,
				[event.target.name]:event.target.value
			}
		})
	}
	
	const onSubmit = (event) => {
		event.preventDefault();
		let item = {
			...state
		};
		dispatch(add(appState.login.token,item));
		setState({
			type:"",
			count:0,
			price:0
		})
	}
	return(
		<div style={{
			margin:"auto",
			textAlign:"center",
			width:"40%",
			backgroundColor:"lightgreen"
		}}>
			<form className="mb-3" onSubmit={onSubmit}>
				<label htmlFor="type" className="form-label">Type</label>
				<input type="text"
						name="type"
						id="type"
						className="form-control"
						onChange={onChange}
						value={state.type}/>
				<label htmlFor="count" className="form-label">Count</label>
				<input type="number"
						name="count"
						id="count"
						className="form-control"
						onChange={onChange}
						value={state.count}/>
				<label htmlFor="price" className="form-label">Price</label>
				<input type="number"
						name="price"
						id="price"
						className="form-control"
						step="0.01"
						onChange={onChange}
						value={state.price}/>
				<input type="submit" className="btn btn-primary" value="Add"/>
			</form>	
		</div>
	)
}

export default ShoppingForm;
import {useDispatch,useSelector} from 'react-redux';

const FunctionCount = (props) => {

	const dispatch = useDispatch();
	const count = useSelector(state => state.count);
	
	const increment = () => {
		console.log("FunctionCount - increment");
		dispatch({
			type:"INCREMENT"
		})
	}
	
	const decrement = () => {
		console.log("FunctionCount - decrement");
		dispatch({
			type:"DECREMENT"
		})
	}
	
	return(
		<div>
			<h2>Count:{count}</h2>
			<button onClick={increment}>Increment</button>
			<button onClick={decrement}>Decrement</button>		
		</div>
	)
}

export default FunctionCount;
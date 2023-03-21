import {useState} from 'react';
import ShoppingList from './components/ShoppingList';
import ShoppingForm from './components/ShoppingForm';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function App() {
	
	const [state,setState] = useState({
		list:[],
		id:100
	})
	
	const addToList = (item) => {
		item.id = state.id;
		setState((state) => {
			return {
				list:state.list.concat(item),
				id:state.id+1
			}
		})
	}

	const removeItem = (id) => {
		setState((state) => {
			let tempList = state.list.filter(item => item.id !== id);
			return {
				...state,
				list:tempList
			}
		})
	}
	
	return(
		<NavigationContainer>
			<Stack.Navigator>
				<Stack.Screen name="ShoppingList">
				{props => <ShoppingList {...props} list={state.list} removeItem={removeItem}/>}
				</Stack.Screen>
				<Stack.Screen name="Add Item">
				{props => <ShoppingForm {...props} addToList={addToList}/>}
				</Stack.Screen>
			</Stack.Navigator>
		</NavigationContainer>
	)
}

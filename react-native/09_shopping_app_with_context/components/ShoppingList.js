import {FlatList,View,Pressable,Text,StyleSheet} from 'react-native'
import useAction from '../hooks/useAction';
import useAppState from '../hooks/useAppState';

const ShoppingList = (props) => {
	
	const {list} = useAppState();
	const {remove,changeMode,logout} = useAction();
	
	return(
		<View style={styles.container}>
			<View style={styles.buttonBox}>
				<Pressable style={styles.navigateButton}
					onPress={() => props.navigation.navigate("Add Item")}>
					<Text style={styles.text}>Add new item</Text>
				</Pressable>
				<Pressable style={[styles.navigateButton,styles.logoutButton]}
					onPress={logout}>
					<Text style={styles.text}>Logout</Text>
				</Pressable>				
			</View>
			<View style={styles.listBox}>
				<FlatList data={list}
						renderItem={
							({item}) => {
								return(
									<View style={styles.row}>
										<Text style={styles.text}>Type:{item.type}</Text>
										<Text style={styles.text}>Count:{item.count}</Text>
										<Text style={styles.text}>Price:{item.price}</Text>
										<Pressable style={styles.removeButton} onPress={() => remove(item.id)}>
											<Text style={styles.text}>Remove</Text>
										</Pressable>
										<Pressable style={styles.removeButton} onPress={() => { 	changeMode("Edit",item);
											props.navigation.navigate("Add Item");
										}}>
											<Text style={styles.text}>Edit</Text>
										</Pressable>
									</View>
								)
							}
						}
						keyExtractor={(item) => ""+item.id}
						/>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container:{
		flex:1
	},
	buttonBox:{
		flex:1,
		justifyContent:"space-evenly",
		flexDirection:"row",
		alignItems:"center"
	},
	listBox:{
		flex:10,
		justifyContent:"center",
		alignItems:"center"
	},
	navigateButton:{
		flex:1,
		justifyContent:"center",
		alignItems:"center",
		backgroundColor:"blue"
	},
	logoutButton:{
		backgroundColor:"green"
	},
	text:{
		fontFamily:"sans-serif",
		fontWeight:"bold",
		fontSize:13,
		padding:2
	},
	removeButton:{
		padding:3,
		width:70,
		height:50,
		backgroundColor:"red",
		alignItems:"center",
		justifyContent:"center"
	},
	row:{
		flex:1,
		flexDirection:"row",
		justifyContent:"space-evenly",
		alignItems:"center"
	}
})

export default ShoppingList;
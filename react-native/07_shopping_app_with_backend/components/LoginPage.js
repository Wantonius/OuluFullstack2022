import {useState} from 'react';
import {View,Pressable,Text,TextInput,StyleSheet} from 'react-native';

const LoginPage = (props) => {

	const [state,setState] = useState({
		username:"",
		password:""
	})
	
	const register = () => {
		let user = {
			...state
		}
		props.register(user);
	}
	
	const login = () => {
		let user = {
			...state
		}
		props.login(user);
	}
	
	return(
		<View style={styles.container}>
			<View style={styles.row}>
				<Text style={[styles.text,styles.label]}>Username</Text>
				<TextInput style={[styles.text,styles.input]}
						onChangeText={(text) => {
							setState((state) => {
								return {
									...state,
									username:text
								}
							})
						}} value={state.username} placeholder="Username"/>
			</View>
			<View style={styles.row}>
				<Text style={[styles.text,styles.label]}>Password</Text>
				<TextInput style={[styles.text,styles.input]}
						onChangeText={(text) => {
							setState((state) => {
								return {
									...state,
									password:text
								}
							})
						}} value={state.password} placeholder="Password" secureTextEntry={true}/>
			</View>
			<View style={[styles.row,styles.buttonRow]}>
				<Pressable style={styles.registerButton}
					onPress={register}>
					<Text style={styles.text}>Register</Text>
				</Pressable>
				<Pressable style={[styles.registerButton,styles.loginButton]}
					onPress={login}>
					<Text style={styles.text}>Login</Text>
				</Pressable>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container:{
		flex:1,
		alignItems:"center",
		justifyContent:"center"
	},
	row:{
		flex:1,
		flexDirection:"row",
		alignItems:"center",
		justifyContent:"center"
	},
	buttonRow:{
		justifyContent:"space-evenly"
	},
	registerButton:{
		height:80,
		width:110,
		backgroundColor:"steelblue",
		alignItems:"center",
		justifyContent:"center"
	},
	loginButton:{
		backgroundColor:"lightgreen"
	},
	text:{
		fontFamily:"sans-serif",
		fontSize:18
	},
	label:{
		fontWeight:"bold"
	},
	input:{
		width:200,
		backgroundColor:"lightblue"
	}
})

export default LoginPage;
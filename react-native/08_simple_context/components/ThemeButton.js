import {useContext} from 'react';
import {View,Text,StyleSheet,Pressable} from 'react-native';
import ThemeContext from '../context/ThemeContext';

const ThemeButton = (props) => {
	
	const theme = useContext(ThemeContext);
	
	const styles = StyleSheet.create({
		button:{
			width:160,
			height:80,
			backgroundColor:theme.background,
			alignItems:"center",
			justifyContent:"center"
		},
		text:{
			fontFamily:"sans-serif",
			fontSize:24,
			color:theme.textcolor
		}
	})
	
	return(
		<Pressable style={styles.button}
			onPress={props.toggleTheme}>
			<Text style={styles.text}>Toggle Theme</Text>
		</Pressable>
	)
}

export default ThemeButton;
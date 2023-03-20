import {useState} from 'react';
import {View,Text,Pressable,StyleSheet,FlatList} from 'react-native';

const ContactList = (props) => {
	
	const [state,setState] = useState({
		data:[
	{
		"firstname": "Beck",
		"lastname": "Byrd",
		"id": 1
	},
	{
		"firstname": "Zephr",
		"lastname": "Park",
		"id": 2
	},
	{
		"firstname": "Flynn",
		"lastname": "Cobb",
		"id": 3
	},
	{
		"firstname": "Keegan",
		"lastname": "Nicholson",
		"id": 4
	},
	{
		"firstname": "Rylee",
		"lastname": "Chavez",
		"id": 5
	},
	{
		"firstname": "Griffin",
		"lastname": "Eaton",
		"id": 6
	},
	{
		"firstname": "Fuller",
		"lastname": "Leonard",
		"id": 7
	},
	{
		"firstname": "Hedwig",
		"lastname": "Conner",
		"id": 8
	},
	{
		"firstname": "Jenna",
		"lastname": "Deleon",
		"id": 9
	},
	{
		"firstname": "Kristen",
		"lastname": "Schultz",
		"id": 10
	},
	{
		"firstname": "Bryar",
		"lastname": "Kramer",
		"id": 11
	},
	{
		"firstname": "Kalia",
		"lastname": "Porter",
		"id": 12
	},
	{
		"firstname": "Akeem",
		"lastname": "O'brien",
		"id": 13
	},
	{
		"firstname": "Brennan",
		"lastname": "Carter",
		"id": 14
	},
	{
		"firstname": "Kiara",
		"lastname": "Valenzuela",
		"id": 15
	},
	{
		"firstname": "Joshua",
		"lastname": "Massey",
		"id": 16
	},
	{
		"firstname": "Orson",
		"lastname": "Juarez",
		"id": 17
	},
	{
		"firstname": "Ayanna",
		"lastname": "Martin",
		"id": 18
	},
	{
		"firstname": "Kerry",
		"lastname": "Travis",
		"id": 19
	},
	{
		"firstname": "Carissa",
		"lastname": "Mathews",
		"id": 20
	},
	{
		"firstname": "Perry",
		"lastname": "Wagner",
		"id": 21
	},
	{
		"firstname": "Hollee",
		"lastname": "Estes",
		"id": 22
	},
	{
		"firstname": "Ava",
		"lastname": "Gregory",
		"id": 23
	},
	{
		"firstname": "Lunea",
		"lastname": "Branch",
		"id": 24
	},
	{
		"firstname": "Jason",
		"lastname": "Buck",
		"id": 25
	},
	{
		"firstname": "Duncan",
		"lastname": "Flowers",
		"id": 26
	},
	{
		"firstname": "Caleb",
		"lastname": "Santos",
		"id": 27
	},
	{
		"firstname": "Raya",
		"lastname": "Aguilar",
		"id": 28
	},
	{
		"firstname": "Cally",
		"lastname": "Garrett",
		"id": 29
	},
	{
		"firstname": "Kyle",
		"lastname": "Campos",
		"id": 30
	},
	{
		"firstname": "Daniel",
		"lastname": "Carrillo",
		"id": 31
	},
	{
		"firstname": "Christopher",
		"lastname": "Bishop",
		"id": 32
	},
	{
		"firstname": "Arthur",
		"lastname": "Bartlett",
		"id": 33
	},
	{
		"firstname": "Meredith",
		"lastname": "Stephens",
		"id": 34
	},
	{
		"firstname": "Hamish",
		"lastname": "Perry",
		"id": 35
	},
	{
		"firstname": "Julian",
		"lastname": "Church",
		"id": 36
	},
	{
		"firstname": "Ronan",
		"lastname": "Campbell",
		"id": 37
	},
	{
		"firstname": "Lani",
		"lastname": "Roth",
		"id": 38
	},
	{
		"firstname": "Wayne",
		"lastname": "Franco",
		"id": 39
	},
	{
		"firstname": "Kellie",
		"lastname": "Garner",
		"id": 40
	},
	{
		"firstname": "Tamara",
		"lastname": "Cantrell",
		"id": 41
	},
	{
		"firstname": "Hope",
		"lastname": "Rutledge",
		"id": 42
	},
	{
		"firstname": "Stephanie",
		"lastname": "Sweeney",
		"id": 43
	},
	{
		"firstname": "Abraham",
		"lastname": "Woodward",
		"id": 44
	},
	{
		"firstname": "Travis",
		"lastname": "Christensen",
		"id": 45
	},
	{
		"firstname": "Chloe",
		"lastname": "Valenzuela",
		"id": 46
	},
	{
		"firstname": "Brenda",
		"lastname": "Lawson",
		"id": 47
	},
	{
		"firstname": "Scarlett",
		"lastname": "Mckenzie",
		"id": 48
	},
	{
		"firstname": "Keegan",
		"lastname": "Rich",
		"id": 49
	},
	{
		"firstname": "Kylie",
		"lastname": "Berg",
		"id": 50
	},
	{
		"firstname": "Serina",
		"lastname": "Bell",
		"id": 51
	},
	{
		"firstname": "Rinah",
		"lastname": "Ramsey",
		"id": 52
	},
	{
		"firstname": "Hannah",
		"lastname": "Olson",
		"id": 53
	},
	{
		"firstname": "Austin",
		"lastname": "Moss",
		"id": 54
	},
	{
		"firstname": "Aurelia",
		"lastname": "Chapman",
		"id": 55
	},
	{
		"firstname": "Lamar",
		"lastname": "Whitaker",
		"id": 56
	},
	{
		"firstname": "Reed",
		"lastname": "Finley",
		"id": 57
	},
	{
		"firstname": "Leigh",
		"lastname": "Sharpe",
		"id": 58
	},
	{
		"firstname": "Jamal",
		"lastname": "Jimenez",
		"id": 59
	},
	{
		"firstname": "Keelie",
		"lastname": "Snider",
		"id": 60
	},
	{
		"firstname": "Xavier",
		"lastname": "Odom",
		"id": 61
	},
	{
		"firstname": "Caryn",
		"lastname": "Mcdaniel",
		"id": 62
	},
	{
		"firstname": "Fiona",
		"lastname": "Britt",
		"id": 63
	},
	{
		"firstname": "Michael",
		"lastname": "Mayo",
		"id": 64
	},
	{
		"firstname": "Raven",
		"lastname": "Guy",
		"id": 65
	},
	{
		"firstname": "Aspen",
		"lastname": "Hurst",
		"id": 66
	},
	{
		"firstname": "Teagan",
		"lastname": "Hogan",
		"id": 67
	},
	{
		"firstname": "Kaseem",
		"lastname": "Shields",
		"id": 68
	},
	{
		"firstname": "Brynne",
		"lastname": "Keller",
		"id": 69
	},
	{
		"firstname": "Stuart",
		"lastname": "Buckner",
		"id": 70
	},
	{
		"firstname": "Ayanna",
		"lastname": "Guzman",
		"id": 71
	},
	{
		"firstname": "Herman",
		"lastname": "Wright",
		"id": 72
	},
	{
		"firstname": "Jescie",
		"lastname": "Whitley",
		"id": 73
	},
	{
		"firstname": "Leslie",
		"lastname": "Delgado",
		"id": 74
	},
	{
		"firstname": "Belle",
		"lastname": "Carrillo",
		"id": 75
	},
	{
		"firstname": "Clark",
		"lastname": "Dillard",
		"id": 76
	},
	{
		"firstname": "Margaret",
		"lastname": "Newman",
		"id": 77
	},
	{
		"firstname": "Cheryl",
		"lastname": "Norris",
		"id": 78
	},
	{
		"firstname": "Miriam",
		"lastname": "Woodard",
		"id": 79
	},
	{
		"firstname": "Jared",
		"lastname": "Shaw",
		"id": 80
	},
	{
		"firstname": "Beau",
		"lastname": "Fry",
		"id": 81
	},
	{
		"firstname": "Kim",
		"lastname": "Carroll",
		"id": 82
	},
	{
		"firstname": "Keelie",
		"lastname": "Carrillo",
		"id": 83
	},
	{
		"firstname": "Grace",
		"lastname": "Sharp",
		"id": 84
	},
	{
		"firstname": "Trevor",
		"lastname": "Sanchez",
		"id": 85
	},
	{
		"firstname": "Constance",
		"lastname": "Combs",
		"id": 86
	},
	{
		"firstname": "Cairo",
		"lastname": "Romero",
		"id": 87
	},
	{
		"firstname": "Dahlia",
		"lastname": "Garcia",
		"id": 88
	},
	{
		"firstname": "Lynn",
		"lastname": "Giles",
		"id": 89
	},
	{
		"firstname": "Marsden",
		"lastname": "Hayden",
		"id": 90
	},
	{
		"firstname": "Naida",
		"lastname": "Ramsey",
		"id": 91
	},
	{
		"firstname": "Cathleen",
		"lastname": "Clayton",
		"id": 92
	},
	{
		"firstname": "Aladdin",
		"lastname": "Lewis",
		"id": 93
	},
	{
		"firstname": "Jin",
		"lastname": "Hickman",
		"id": 94
	},
	{
		"firstname": "Wesley",
		"lastname": "Wilkerson",
		"id": 95
	},
	{
		"firstname": "Shoshana",
		"lastname": "Lynch",
		"id": 96
	},
	{
		"firstname": "Brenda",
		"lastname": "Martinez",
		"id": 97
	},
	{
		"firstname": "Patience",
		"lastname": "Reeves",
		"id": 98
	},
	{
		"firstname": "Bree",
		"lastname": "Bryant",
		"id": 99
	},
	{
		"firstname": "Slade",
		"lastname": "Cobb",
		"id": 100
	}
]
	})
	
	const removeItem = (id) => {
		setState((state) => {
			let tempList = state.data.filter(contact => contact.id !== id);
			return {
				data:tempList
			}
		})
	}
	return (
		<View>
			<FlatList data={state.data}
					renderItem={({item}) => {
						return(
							<View style={styles.rowStyle}>
								<Text style={styles.textStyle}>
									{item.firstname} {item.lastname}
								</Text>
								<Pressable style={styles.buttonStyle}
									onPress={() => removeItem(item.id)}>
									<Text>Remove</Text>
								</Pressable>
							</View>
						)
					}}
					keyExtractor={(item) => ""+item.id}
					/>
		</View>
	)
}

const styles = StyleSheet.create({
	rowStyle:{
		flexDirection:"row",
		height:60,
		alignItems:"center",
		justifyContent:"space-between"
	},
	textStyle:{
		fontFamily:"sans-serif",
		fontSize:18,
		fontWeight:"bold"
	},
	buttonStyle:{
		width:80,
		height:50,
		borderRadius:5,
		backgroundColor:"red",
		alignItems:"center",
		justifyContent:"center"
	}
})

export default ContactList;
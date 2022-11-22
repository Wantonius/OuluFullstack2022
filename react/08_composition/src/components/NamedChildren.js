const NamedChildren = (props) => {
	
	let cardStyle = {
		backgroundColor:"lightblue",
		height:200,
		width:150,
		textAlign:"center",
		margin:10
	}
	
	return(
		<div style={cardStyle}>
			<>{props.header}</>
			{props.media ? <>{props.media}</>:<></>}
			<>{props.content}</>
		</div>
	)
}

export default NamedChildren;
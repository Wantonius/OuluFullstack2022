import React,{ReactChild} from 'react';

interface Props {
	header:ReactChild;
	media?:ReactChild;
	content:ReactChild;
}

const NamedChildren:React.FC<Props> = (props:Props) => {
	
	let cardStyle:React.CSSProperties = {
		backgroundColor:"lightblue",
		height:200,
		width:150,
		textAlign:"center",
		margin:10
	}
	return(
		<div style={cardStyle}>
			{props.header}
			{props.media ? <>{props.media}</>:<></>}
			{props.content}
		</div>
	)
}

export default NamedChildren;
import logo from './logo.svg';
import './App.css';
import HelloWorld from './HelloWorld';
import HelloClass from './HelloClass';
function App() {
  return (
    <div className="App">
		<HelloWorld/>
		<HelloWorld name="Erno"/>
		<HelloClass/>
		<HelloClass name="Erno"/>
    </div>
  );
}

export default App;

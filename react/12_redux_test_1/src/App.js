import logo from './logo.svg';
import './App.css';
import FunctionCount from './components/FunctionCount';
import ClassCount from './components/ClassCount';
function App() {
  return (
    <div className="App">
		<FunctionCount/>
		<hr/>
		<ClassCount/>
	</div>
  );
}

export default App;

import logo from './logo.svg';
import './App.css';
import ContactCard from './components/ContactCard';
import NamedChildren from './components/NamedChildren';

function App() {
  return (
    <div className="App">
		<ContactCard>
			My Test Card
		</ContactCard>
		<ContactCard>
			<h3>HTML Header</h3>
		</ContactCard>
		<NamedChildren
			header={<h2>Complex Contact Card</h2>}
			media={<h2>Media Area</h2>}
			content={<h2>Content Area</h2>}/>
		<NamedChildren
			header={<h2>No Media Card</h2>}
			content={<h2>Content Area</h2>}/>
    </div>
  );
}

export default App;

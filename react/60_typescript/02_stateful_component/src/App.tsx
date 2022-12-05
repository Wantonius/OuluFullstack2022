import React from 'react';
import logo from './logo.svg';
import './App.css';
import StatefulComponent from './StatefulComponent';
import StatefulClass from './StatefulClass';

function App() {
  return (
    <div className="App">
		<StatefulComponent/>
		<StatefulClass/>
    </div>
  );
}

export default App;

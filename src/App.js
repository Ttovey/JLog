import './App.css';
import {HashRouter, Routes, Route} from 'react-router-dom'
import { useState } from 'react';

//components
import Navbar from './components/Navbar'


//pages

function App() {

  const [username, setUsername] = useState('')

  return (
    <div className="App">
      <Navbar />
    </div>
  );
}

export default App;

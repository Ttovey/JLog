import './App.css';
import {HashRouter, Routes, Route} from 'react-router-dom'
import { useState } from 'react';

//components
import Navbar from './components/Navbar'

//pages
import Activities from './pages/Activites';
import DashBoard from './pages/DashBoard';
import Events from './pages/Events';
import GymFinder from './pages/GymFinder';
import Journal from './pages/Journal'

//auth pages
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';

function App() {

  const [username, setUsername] = useState('')

  return (
    <div className="App">
      <HashRouter>
      <Navbar username={ username } setUsername={ setUsername }/>
      <Routes>
      {/* Auth Routes */}
      <Route path='/login' element={ <LoginPage setUsername={ setUsername }/>} />
      <Route path="/signup" element={ <SignUpPage /> } />

      {/* Main Routes */}
      </Routes>
      </HashRouter>
    </div>
  );
}

export default App;

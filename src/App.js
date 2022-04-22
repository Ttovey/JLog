import './App.css';
import {HashRouter, Routes, Route} from 'react-router-dom'
import { useEffect, useState } from 'react';

//components
import MyNavbar from './components/MyNavbar'
import Footer from './components/Footer';

//pages
import Activities from './pages/Activites';
import DashBoard from './pages/DashBoard';
import Events from './pages/Events';
import GymFinder from './pages/GymFinder';
import Journal from './pages/Journal'

//auth pages
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import CheckLoginPage from './pages/CheckLoginPage';

function App() {

  const [username, setUsername] = useState('')
  const [userId, setUserId] = useState(null)
  console.log(localStorage)
  useEffect(() => {
    const loggedInUser = localStorage.getItem('user')
    const loggedInUserId = localStorage.getItem('userId')
    console.log(localStorage)
    if (loggedInUser) {
      setUsername(loggedInUser)
      setUserId(loggedInUserId)
    }
  }, [])

  return (
    <div className="App">
      <HashRouter>
      <MyNavbar username={ username } setUsername={ setUsername }/>
      <Routes>
      {/* Auth Routes */}
      <Route path='/login' element={ <LoginPage setUsername={ setUsername } setUserId={setUserId}/>} />
      <Route path="/signup" element={ <SignUpPage /> } />

      {/* Main Routes */}
      <Route path='/' element={<CheckLoginPage username={username} actualPage={() => <DashBoard username={username}/>}/>}/>
      <Route path='/activities' element={<CheckLoginPage username={username} actualPage={() => <Activities username={username} userId={userId}/>}/>}/>

      </Routes>
      <Footer />
      </HashRouter>
    </div>
  );
}

export default App;

import { Link } from 'react-router-dom'

function LandingPage() {

  return (
  <div>
    <div className='header'>
      <img src={require('../assets/wallpaper.webp')}></img>
      <h2 className='welcome'>Welcome to JLog! The premium Jiu Jitsu tracking experience, it appears you are not currently logged in. Please <Link to="/login">login</Link> or <Link to="/signup">signup</Link>.</h2>
    </div>
  </div>
  
  )

}

export default LandingPage;
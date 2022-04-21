import { Link } from "react-router-dom"

function CheckLoginPage(props) {
  
  if (props.username === "") {
    return <p>Welcome to JLog! The premium Jiu Jitsu tracking experience, it appears you are not currently logged in. Please <Link to="/login">login</Link> or <Link to="/signup">signup</Link>.</p>
  }
  
  return (
    <div>
      { props.actualPage() }
    </div>
  )
}

export default CheckLoginPage;
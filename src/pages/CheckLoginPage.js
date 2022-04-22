import { Link } from "react-router-dom"
import LandingPage from "./LandingPage";

function CheckLoginPage(props) {
  
  if (props.username === "") {
    return <LandingPage />
  }
  
  return (
    <div>
      { props.actualPage() }
    </div>
  )
}

export default CheckLoginPage;
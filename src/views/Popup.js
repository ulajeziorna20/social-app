import { Link } from "react-router-dom"
import LoginForm from "../components/LoginForm"

import "./Popup.css"

const Popup = (props) => {
  return (
    <div className="popup">
      <div className="closePopup" onClick={props.closePopup}>
        X
      </div>
      <h2>Already have an account?</h2>
      <LoginForm user={props.user} setUser={props.setUser} />

      <span>No? Create account! <Link to="/signup">SignUp</Link></span>
    </div>
  )
}

export default Popup

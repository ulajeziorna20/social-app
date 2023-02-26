import "./App.css"

import { useEffect, useState } from "react"

import AppNav from "./components/AppNav"
import AppRoutes from "./routes/AppRoutes"

import axios from "axios"

function App() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")))
  const [showPopup, setShowPopup] = useState(false)

  axios.defaults.headers.common["Authorization"] =
    "Bearer " + (user ? user.jwt_token : "")
  axios.defaults.headers.post["Content-Type"] = "application/json"

  useEffect(() => {
    const PopUpStatusChange = () => {
      setShowPopup(true)
    }

    const timeId = setTimeout(() => {
      PopUpStatusChange()
    }, 5000)

    return () => {
      clearTimeout(timeId)
    }
  }, [])

  const closePopup = () => {
    setShowPopup(false)
  }

  return (
    <div className="App">
      <AppNav user={user} setUser={setUser} />
      <AppRoutes
        user={user}
        setUser={setUser}
        showPopup={showPopup}
        closePopup={closePopup}
      />
    </div>
  )
}

export default App

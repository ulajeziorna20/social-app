import "./SignUp.css"

import { useState } from "react"

import axios from "axios"
import { Navigate, Link } from "react-router-dom"

const SignUp = (props) => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    repeatPassword: "",
  })

  

  const [errors, serErrors] = useState({
    username: "",
    email: "",
    password: "",
    repeatPassword: "",
  })

  const [signUpMessage, setSignUpMessage] = useState("")
  const [signUpDone, setSignUpDone] = useState(false)



  // this.state = {
  //   formData: {
  //     username: "",
  //     email: "",
  //     password: "",
  //     repeatPassword: "",
  //   },
  //   errors:{
  //     username: "",
  //     email: "",
  //     password: "",
  //     repeatPassword: "",
  //   },
  //   signUpMessage: '',
  //   signUpDone: false
  // }

  const handleInputChange = (e) => {
    const target = e.target
    const name = target.name

    setFormData({
      ...formData,
      [name]: target.value,
    })
  }

  const validate = () => {
    let validationErrors = {
      username: false,
      email: false,
      password: false,
      repeatPassword: false,
    }

    /* User name */
    if (formData.username.trim().length < 4) {
      validationErrors.username = true
      serErrors((prevErrors) => {
        return {
          ...prevErrors,
          username: "Username should have at least 4 characters",
        }
      })
    } else if (!/^[^\s]*$/.test(formData.username.trim())) {

      console.log(!/^[^\s]*$/.test(formData.username.trim()));
      validationErrors.username = true
      serErrors((prevErrors) => {
        return {
          ...prevErrors,
          username: "Username should'n have empty characters",
        }
      })
    } else {
      validationErrors.username = false
      serErrors((prevErrors) => {
        return { ...prevErrors, username: "" }
      })
    }

    /* Email */
    if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email.trim())
    ) {
      validationErrors.email = true
      serErrors((prevErrors) => {
        return {
          ...prevErrors,
          email: "There is no valid email",
        }
      })
    } else {
      validationErrors.email = false
      serErrors((prevErrors) => {
        return { ...prevErrors, email: "" }
      })
    }

    /* Password */
    if (formData.password.trim().length < 6) {
      validationErrors.password = true
      serErrors((prevErrors) => {
        return {
          ...prevErrors,
          password: "Password should have at least 6 characters",
        }
      })
    } else if (!/^[^\s]*$/.test(formData.password.trim())) {
      validationErrors.password = true
      serErrors((prevErrors) => {
        return {
          ...prevErrors,
          password: "Password should'n have empty characters",
        }
      })
    } else if (
      !/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/.test(formData.password.trim())
    ) {
      validationErrors.password = true
      serErrors((prevErrors) => {
        return {
          ...prevErrors,
          password: "Password must contain one of charts: ! # @ $ %",
        }
      })
    } else {
      validationErrors.password = false
      serErrors((prevErrors) => {
        return { ...prevErrors, password: "" }
      })
    }

    /* Password repeat */
    if (formData.password.trim() !== formData.repeatPassword.trim()) {
      validationErrors.repeatPassword = true
      serErrors((prevErrors) => {
        return {
          ...prevErrors,
          repeatPassword: "Passwords should be the same",
        }
      })
    } else {
      validationErrors.repeatPassword = false
      serErrors((prevErrors) => {
        return { ...prevErrors, repeatPassword: "" }
      })
    }

    // chodxzi o to ze ma byc false a domyslnie wartości bez 1 maja true
    return (
      !validationErrors.username &&
      !validationErrors.email &&
      !validationErrors.password &&
      !validationErrors.repeatPassword
    )
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!validate()) {
      return
    }

    let newUser = {
      username: formData.username,
      email: formData.email,
      password: formData.password,
    }

    axios
      .post(
        "http://akademia108.pl/api/social-app/user/signup",
        JSON.stringify(newUser)
      )
      .then((req) => {
        let reqData = req.data

        if (reqData.signedup) {
          setSignUpMessage("Account created")
          setSignUpDone(true)
          setFormData({
            username: "",
            email: "",
            password: "",
            repeatPassword: "",
          })
        } 
        
        // else {
        //   if (reqData.message.username) {
        //     setSignUpMessage(reqData.message.username[0])
        //   } else if (reqData.message.email) {
        //     setSignUpMessage(reqData.message.email[0])
        //   }
        // }
      })
      .catch((error) => {
        console.error(error)
      })
  }

  return (
    <div className="signUp">
      {props.user && <Navigate to="/" />}
      <form onSubmit={handleSubmit}>
        {signUpMessage && <h2>{signUpMessage}</h2>}
        <input
          type="text"
          name="username"
          placeholder="User name"
          onChange={handleInputChange}
          disabled={signUpDone}
        />
        {errors.username && <p>{errors.username}</p>}
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleInputChange}
          disabled={signUpDone}
        />
        {errors.email && <p>{errors.email}</p>}
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleInputChange}
          disabled={signUpDone}
        />
        {errors.password && <p>{errors.password}</p>}
        <input
          type="password"
          name="repeatPassword"
          placeholder="Repeat password"
          onChange={handleInputChange}
          disabled={signUpDone}
        />
        {errors.repeatPassword && <p>{errors.repeatPassword}</p>}
        <button className="btn" disabled={signUpDone}>
          Sign Up
        </button>

        {signUpDone && (
          <div>
            <Link to="/login" className="btn">
              Przejdź do logowania
            </Link>
          </div>
        )}
      </form>
    </div>
  )
}

export default SignUp

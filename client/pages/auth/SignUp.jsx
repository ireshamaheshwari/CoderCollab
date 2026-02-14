import axios from 'axios';
import { React, useContext, useState } from 'react'
import { AuthContext } from '../../context/AuthContext';
import { Navigate, useNavigate } from 'react-router-dom';

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const signUpUser = async (e) => {
    e.preventDefault()
    console.log("before sign up user : ", name, email, password)
    try {
      const userData = await axios.post("http://localhost:5000/api/user/register", { email: email, password: password, name: name })
      if (!userData) throw Error("internal error : not able to sign up")
      console.log(userData);
      login(userData?.data.accessToken);
      navigate('/' , {replace : true})
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div>
      <form>
        <div class="mb-3">
          <label for="inputName" className="form-label">Full Name</label>
          <input className="form-control" id="inputName" aria-describedby="name"
            onChange={(e) => {
              setName(e.target.value)
            }}
          ></input>
        </div>
        <div class="mb-3">
          <label for="inputEmailAddress" className="form-label">Email address</label>
          <input type="email" className="form-control" id="inputEmailAdress" aria-describedby="email"
            onChange={(e) => {
              setEmail(e.target.value)
            }}
          ></input>
        </div>
        <div class="mb-3">
          <label for="inputPassword" className="form-label">Password</label>
          <input type="password" className="form-control" id="inputPassword"
            onChange={(e) => {
              setPassword(e.target.value)
            }}
          ></input>
        </div>
        <button type="submit" className="btn btn-primary"
          onClick={signUpUser}
        >Submit</button>
      </form>
    </div>
  )
}

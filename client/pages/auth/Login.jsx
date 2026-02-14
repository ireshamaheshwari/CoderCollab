import React, { useContext, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import axios from "axios";
import {AuthContext} from '../../context/AuthContext.jsx'
import { Navigate, useNavigate } from 'react-router-dom';

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const {login} = useContext(AuthContext)
    const navigate = useNavigate();

    const loginUser = async (e) => {
        e.preventDefault()
        const userData = JSON.stringify({ email: email, password: password });
        console.log("userData before login : ", userData);
        try {
            const loginUser = await axios.post('http://localhost:5000/api/user/login', { email, password });
            console.log(loginUser?.data.accessToken);
            login(loginUser?.data.accessToken);
            navigate('/', { replace: true })
        } catch (error) {
            if (error.response) {
                console.error('Response error:', error.response.data);
                console.error('Status code:', error.response.status);
            } else if (error.request) {
                console.error('Request error:', error.request);
            } else {
                console.error('Error:', error.message);
            }
        }
    };

    return (
        <div>
            <form onSubmit={loginUser}>
                <div className="mb-3">
                    <label htmlFor="inputEmailAddress" className="form-label">Email address</label>
                    <input
                        type="email"
                        className="form-control"
                        id="inputEmailAdress"
                        aria-describedby="email"
                        onChange={(e) => {
                            setEmail(e.target.value);
                        }}
                    ></input>
                </div>
                <div className="mb-3">
                    <label htmlFor="inputPassword" className="form-label">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="inputPassword"
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }}
                    ></input>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
}
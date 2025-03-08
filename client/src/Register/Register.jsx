import React, { useState, useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
export default function Register() {
    const [formData, setFormData] = useState(
        { username: "", email: "", password: "", mobile: "" }
    )
    const { setUser } = useContext(AuthContext)
    const navigate = useNavigate()
    function handleChange(e) {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }
    function handleSubmit(e) {
        e.preventDefault()
        console.log(formData)
        axios.post("https://workshop-ecommerce-mern.onrender.com/api/auth/signup", formData)
            .then((res) => {
                console.log("response from register", res)
                localStorage.setItem("token", res.data.token)
                console.log(localStorage.getItem(res.data.token))
                console.log(localStorage.getItem(res.data.role))
                setUser({ token: res.data.token, role: res.data.role })
                navigate("/")
            })
            .catch((err) => {
                console.log(err)
            })
    }
    return (
        <div className="container d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
            <div className="card p-4 shadow" style={{ width: '400px' }}>
                <h2 className="text-center mb-4">Register</h2>
                <form action="" method="POST">
                    <div className="form-group p-1">
                        <label htmlFor="username">Name</label>
                        <input type="text" className="form-control" id="username" placeholder="Name" name="username" onChange={handleChange} required />
                    </div>
                    <div className="form-group p-1">
                        <label htmlFor="email">Email ID</label>
                        <input type="email" className="form-control" id="email" placeholder="Email ID" name="email" onChange={handleChange} required />
                    </div>
                    <div className="form-group p-1">
                        <label htmlFor="password">Password</label>
                        <input type="password" className="form-control" id="password" placeholder="Password" name="password" onChange={handleChange} required />
                    </div>
                    <div className="form-group p-1">
                        <label htmlFor="mobile">Mobile Number</label>
                        <input type="text" className="form-control" id="mobile" placeholder="Mobile Number" name="mobile" onChange={handleChange} required />
                    </div>
                    <div className="text-center p-1">
                        <button type="submit" className="btn btn-primary btn-block mt-2" onClick={handleSubmit}>Register</button>
                    </div>
                </form>
            </div>
        </div>

    )
}
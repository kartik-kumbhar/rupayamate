import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import "./Register.css"
import axios from "axios";
import { useAuth } from '../../store/auth';
import { toast } from "react-toastify";

const Login = () => {
    const [user, setUser] = useState({
        email: "",
        password: ""
    });

    const handleInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setUser({
            ...user,
            [name]: value
        })
    }

    const navigate = useNavigate();

    const { storetokenInLS } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`rupayamatebackend.vercel.app/api/users/login`, user);

            if (response.statusText) {
                const token = await response.data.token;
                storetokenInLS(token);
                toast.success(response.data.message)
                navigate("/");
            }
        } catch (error) {

            if (error.response) {
                const err = error.response.data;
                toast.error(err.extraDetail ? err.extraDetail : err.message);
                // console.log(error.response.data); // backend message
            } else {
                toast.error("Something went wrong");
            }
        }

    }

    return (
        <div>
            <section>
                <main>
                    <div className="section-registration">
                        <div className="container grid grid-two-cols">
                            <div className="registration-image">
                                <img
                                    src="/images/login.png"
                                    alt="a girl is trying to do registration"
                                    width="500"
                                    height="500"
                                />
                            </div>

                            <div className="registration-form">
                                <h1>Login Form</h1>
                                <form onSubmit={handleSubmit}>
                                    <div>
                                        <label htmlFor="email">Email :</label>
                                        <input
                                            type="email"
                                            name="email"
                                            placeholder="Enter your email"
                                            id="email"
                                            required
                                            autoComplete="off"
                                            value={user.email}
                                            onChange={handleInput}
                                        />

                                        <label htmlFor="password">Password :</label>
                                        <input
                                            type="password"
                                            name="password"
                                            placeholder="Enter your password"
                                            id="password"
                                            required
                                            autoComplete="off"
                                            value={user.password}
                                            onChange={handleInput}
                                        />
                                    </div>

                                    <button type='submit' className='btn btn-submit'>
                                        Login Now
                                    </button>
                                </form>
                                <div>
                                    <p>Don't have an account? <Link to={"/register"}> Register</Link></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>

            </section>
        </div>
    )
}

export default Login

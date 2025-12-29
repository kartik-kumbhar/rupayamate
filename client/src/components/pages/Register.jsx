import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom"
import "./Register.css"
import axios from "axios";
import { useAuth } from '../../store/auth';
import { toast } from "react-toastify"

const Register = () => {
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: ""
    });
    const handleInput = (e) => {
        let name = e.target.name;
        let value = e.target.value;

        setUser({
            ...user,
            [name]: value  //only that one field value updated dynamically
        });

    }
    const navigate = useNavigate();

    const { storetokenInLS } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // const response = await fetch(`https://rupayamate.onrender.com/users/register`, {
            //     method: "POST",
            //     headers: {
            //         "Content-Type": "application/json"
            //     },
            //     body: JSON.stringify(user)
            // });

            const response = await axios.post(`https://rupayamate.onrender.com/users/register`, user);

            if (response.statusText) {
                const token = await response.data.token;
                storetokenInLS(token);
                navigate("/login");

            }
            toast.success(response.data.message);
        } catch (error) {
            if (error.response) {
                toast.error(error.response.data.extraDetail ? error.response.data.extraDetail : error.response.data.message);
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
                                    src="/images/register.png"
                                    alt="a girl is trying to do registration"
                                    width="500"
                                    height="500"
                                />
                            </div>

                            <div className="registration-form">
                                <h1>Registrtion Form</h1>
                                <form onSubmit={handleSubmit}>
                                    <div>
                                        <label htmlFor="name">Name :</label>
                                        <input
                                            type="text"
                                            name="name"
                                            placeholder="Enter your name"
                                            id="name"
                                            required
                                            autoComplete="off"
                                            value={user.name}
                                            onChange={handleInput}
                                        />

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
                                        Register Now
                                    </button>
                                </form>
                                <div>
                                    <p>Already have an account? <Link to={"/login"}> Log in</Link></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>

            </section>
        </div>
    )
}

export default Register

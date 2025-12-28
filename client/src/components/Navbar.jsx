import React from 'react'
import { NavLink } from "react-router-dom"
import "./Navbar.css"
import { useAuth } from '../store/auth'
const Navbar = () => {
    let { isLoggedIn } = useAuth();
    return (
        <div>
            <header>
                <div className="container">
                    <div className="logo-brand">
                        <a href='/' ><img className='navbar-logo' src='/images/symbol.png' />RupayaMate</a>
                    </div>

                    <nav>
                        <ul>
                            {isLoggedIn ?
                                <>
                                    <li><NavLink to={"/"}> Dashboard </NavLink></li>
                                    <li><NavLink to={"/form"}> TransactionForm </NavLink></li>
                                    <li><NavLink to={"/list"}> TransactionList </NavLink></li>
                                    <li><NavLink to={"/logout"}>Logout</NavLink></li>
                                </>
                                : <>
                                    <li><NavLink to={"/register"}> Register </NavLink></li>
                                    <li><NavLink to={"/login"}> Login </NavLink></li>
                                </>
                            }
                        </ul>
                    </nav>
                </div>
            </header>
        </div>
    )
}

export default Navbar

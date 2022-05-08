import React, { Component } from "react";
import { Link } from "react-router-dom";

const Menu = () => {
    return (
        <nav id="sidebarMenu" className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
            <div className="position-sticky pt-3">
                <ul className="nav flex-column">
                    <li className="nav-item">
                        <Link to={"/"} className="nav-link">Dashboard</Link>
                    </li>
                    <li className="nav-item">
                     <Link to={"/register"} className="nav-link">Register</Link>
                    </li>
                    <li className="nav-item">
                    <Link to={"/users"} className="nav-link">Users</Link>
                    </li>

                    <li className="nav-item">
                    <Link to={"/login"} className="nav-link">Login</Link>
                    </li>
                    
                </ul>
            </div>
        </nav>
    )
}

export default Menu;
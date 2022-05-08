import axios from "axios";
import React, { Component, useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Nav = () => {

    const [user, setUser] = useState({
        first_name: '',
        last_name: '',
        email: ''
    });

    useEffect(() => {
        (
            async () => {
                const { data } = await axios.get('user')
                setUser(data);
            }
        )();
    }, []);


  const logout= async ()=>{
    await axios.post('logout',{});
  }

    return (
        <header className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
            {/* <a className="navbar-brand col-md-3 col-lg-2 me-0 px-3" href="#"></a> */}

            <Link to={"/"} className="navbar-brand col-md-3 col-lg-2 me-0 px-3">My Company</Link>
            {/* <button className="navbar-toggler position-absolute d-md-none collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <input className='form-control form-control-dark w-100' type="text" placeholder='Search' aria-label='Search' /> */}

            <div className="navbar-nav">
                <div className="nav-item text-nowrap">
                    <Link to={'/profile'} className="nav-link px-3" >{user.first_name} {user.last_name}</Link>
                    <Link to={'/login'} onClick={logout}  className="nav-link px-3" >Sign out</Link>
                </div>
            </div>
        </header>
    );
}

export default Nav;
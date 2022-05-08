import axios from 'axios';
import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';


const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);


   const hasValue= document.cookie.;

    const submit = async (e: React.SyntheticEvent) => {

        e.preventDefault();

        const response = await axios.post('http://localhost:8000/api/login', {
            email,
            password
        },{withCredentials: true});
        //{withCredentials: true}
        console.log(response);
        setRedirect(true);
    };

    if(redirect){
        return <Navigate to={'/'} />
    }

    return (

        <main className="form-signin">
            <form onSubmit={submit}>
                <h1 className="h3 mb-3 fw-normal"></h1>

                <input type="email" className="form-control" placeholder="Email" required
                    onChange={e => setEmail(e.target.value)}
                />
                <input type="password" className="form-control" placeholder="Password" required
                    onChange={e => setPassword(e.target.value)}
                />
                <button className="w-100 btn btn-lg btn-primary" type="submit">Submit</button>
            </form>
        </main>
    );
}

export default Login;
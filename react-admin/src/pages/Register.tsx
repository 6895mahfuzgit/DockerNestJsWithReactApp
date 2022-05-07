import * as React from 'react';
import { Component } from 'react';
import '../Login.css'


class Register extends Component {

    render() {
        return (
            <main className="form-signin">
                <form>
                    <h1 className="h3 mb-3 fw-normal">Please register</h1>
                    <input className="form-control" placeholder="First Name" required />
                    <input className="form-control" placeholder="Last Name" required />
                    <input type="email" className="form-control" placeholder="Email" required />
                    <input type="password" className="form-control" placeholder="Password" required />
                    <input type="password" className="form-control" placeholder="Confirm Password" required />
                    <button className="w-100 btn btn-lg btn-primary" type="submit">Submit</button>
                </form>
            </main>
        );
    }
}

export default Register;

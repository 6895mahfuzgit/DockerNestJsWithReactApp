
import React, { Component } from 'react';
import Wrapper from '../components/Wrapper';

class Users extends Component {
    render() {
        return (
            <Wrapper>
                <div className="table-responsive">
                    <table className="table table-striped table-sm">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Header</th>
                                <th scope="col">Header</th>
                                <th scope="col">Header</th>
                                <th scope="col">Header</th>
                            </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>
                </div>
            </Wrapper>
        )
    }
}

export default Users;
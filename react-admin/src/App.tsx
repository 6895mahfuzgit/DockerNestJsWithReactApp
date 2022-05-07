import React from 'react';
import logo from './logo.svg';
import './App.css';
import Nav from './components/Nav';

function App() {
  return (
    <div className="App">
     <Nav/>
      <div className="container-fluid">
        <div className="row">
          <nav id="sidebarMenu" className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
            <div className="position-sticky pt-3">
              <ul className="nav flex-column">
                <li className="nav-item">
                  <a className="nav-link active" aria-current="page" href="#">
                    <span data-feather="home"></span>
                    Dashboard
                  </a>
                </li>
              </ul>
            </div>
          </nav>

          <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
              <h1 className="h2">Dashboard</h1>

            </div>


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
          </main>
        </div>
      </div>
    </div>
  );
}

export default App;

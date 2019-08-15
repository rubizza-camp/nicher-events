import React, {Component} from 'react';
import { Router, Route, NavLink, Switch} from 'react-router-dom'

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    // let user_name = {first_name: '', last_name: '', role: ''};
    // if (sessionStorage.user_attributes != null) {
    //   user_name = JSON.parse(sessionStorage.user_attributes);
    // }



    return (
      <div className="App">
        <Navigation/>
        { sessionStorage.user }
        <div className="container">
        </div>
      </div>
    );
  }
}


const Navigation = () => (
  <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
    <ul className="navbar-nav mr-auto">
      <li className="nav-item">
        <NavLink exact className="nav-link" activeClassName="active" to="/home">Home</NavLink>
      </li>
      <li className="nav-item"><NavLink exact className="nav-link" activeClassName="active" to="/">Back</NavLink></li>
    </ul>
  </nav>
);


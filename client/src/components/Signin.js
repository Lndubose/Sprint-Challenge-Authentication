import React from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';

class Signin extends React.Component {
  state = {
    username: '',
    password: '',
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();

    axios
      .post('http://localhost:3300/api/login', this.state)
      .then(response => {
        localStorage.setItem('jwt', response.data.token);
        this.props.history.push('/jokes');
      })
      .catch(err => {
        alert('Wrong Username and/or Password.');
      });
  };

  render() {
    return (
      <div>
        <h2>Sign In</h2>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="username">
            <input
              name="username"
              type="text"
              value={this.state.username}
              onChange={this.handleChange}
            />
          </label>
          <label htmlFor="password">
            <input
              name="password"
              type="password"
              value={this.state.password}
              onChange={this.handleChange}
            />
          </label>
          <button type="submit">Sign In</button>
          <NavLink to="/register">Register</NavLink>
        </form>
      </div>
    );
  }
}

export default Signin;

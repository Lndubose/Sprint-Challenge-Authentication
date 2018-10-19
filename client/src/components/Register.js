import React from 'react';
import axios from 'axios';

class Register extends React.Component {
  state = {
    username: '',
    password: '',
    nameUsed: false,
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const newUser = {
      username: this.state.username,
      password: this.state.password,
    };

    axios
      .post('http://localhost:3300/api/register', newUser)
      .then(response => {
        localStorage.setItem('jwt', response.data.token);
        this.setState({ nameUsed: false });
        this.props.history.push('/jokes');
      })
      .catch(err => this.setState({ nameUsed: true }));
  };

  render() {
    return (
      <div>
        <h2>Register</h2>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="username">
            <input
              name="username"
              type="text"
              value={this.state.username}
              onChange={this.handleChange}
            />
          </label>
          {this.state.nameUsed ? <p>Username is already used.</p> : null}
          <label htmlFor="password">
            <input
              name="password"
              type="text"
              value={this.state.password}
              onChange={this.handleChange}
            />
          </label>
          <button type="submit">Register</button>
        </form>
      </div>
    );
  }
}

export default Register;

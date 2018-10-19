import React from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

import { Container } from '../styles/GlobalStyles';
import { Label, Input, Button } from '../styles/FormStyles';

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
        <Container>
          <h2>Sign In</h2>
          <form onSubmit={this.handleSubmit}>
            <Label htmlFor="username">
              {' '}
              Username
              <Input
                name="username"
                type="text"
                value={this.state.username}
                onChange={this.handleChange}
              />
            </Label>
            <Label htmlFor="password">
              {' '}
              Password
              <Input
                name="password"
                type="password"
                value={this.state.password}
                onChange={this.handleChange}
              />
            </Label>
            <SignIn type="submit">Sign In</SignIn>
            <NavLink to="/register">
              <Register>Register</Register>
            </NavLink>
          </form>
        </Container>
      </div>
    );
  }
}

export default Signin;

const UsernameInput = styled(Input)``;

const Register = styled(Button)`
  margin-left: 5%;
`;

const SignIn = styled(Button)``;

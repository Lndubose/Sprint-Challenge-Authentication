import React from 'react';
import axios from 'axios';
import styled from 'styled-components';

import { Container } from '../styles/GlobalStyles';
import { Label, Input, Button } from '../styles/FormStyles';

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
        <Container>
          <h2>Register</h2>
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
            {this.state.nameUsed ? <p>Username is already used.</p> : null}
            <Label htmlFor="password">
              Password
              <Input
                name="password"
                type="text"
                value={this.state.password}
                onChange={this.handleChange}
              />
            </Label>
            <RegisterButton type="submit">Register</RegisterButton>
          </form>
        </Container>
      </div>
    );
  }
}

export default Register;

const RegisterButton = styled(Button)`
  margin-top: 10px;
`;

import React from 'react';
import axios from 'axios';

import Joke from './Joke';

import { Container } from '../styles/GlobalStyles';

class Jokes extends React.Component {
  state = {
    jokes: [],
    signin: false,
    random: false,
  };

  componentDidMount() {
    this.callServerHandle();
  }

  callServerHandle = e => {
    const token = localStorage.getItem('jwt');
    const options = {
      headers: {
        Authorization: token,
      },
    };

    axios
      .get('http://localhost:3300/api/jokes', options)
      .then(response => {
        this.setState({ signin: true, jokes: response.data });
      })
      .catch(err => console.log('Not Authorized', err));
  };

  render() {
    return (
      <div>
        <Container>
          <h1>Jokes for You</h1>
          {this.state.signin ? (
            this.state.jokes.map((joke, index) => (
              <Joke key={index} joke={joke} />
            ))
          ) : (
            <h4>Please Sign In to see Jokes!</h4>
          )}
          <button onClick={this.callServerHandle}>Randomize</button>
        </Container>
      </div>
    );
  }
}

export default Jokes;

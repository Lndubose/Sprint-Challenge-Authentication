import React from 'react';
import axios from 'axios';

import Joke from './Joke';

class Jokes extends React.Component {
  state = {
    jokes: [],
    signin: false,
  };

  componentDidMount() {
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
  }

  randomizeHandle = e => {
    document.location.reload();
  };

  render() {
    return (
      <div>
        <h1>Jokes for You</h1>
        {this.state.signin ? (
          this.state.jokes.map(joke => <Joke key={joke.id} joke={joke} />)
        ) : (
          <h4>Please Sign In to see Jokes!</h4>
        )}
        <button onClick={this.randomizeHandle}>Randomize</button>
      </div>
    );
  }
}

export default Jokes;

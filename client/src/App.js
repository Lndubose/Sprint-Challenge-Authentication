import React, { Component } from 'react';

import { Route, NavLink } from 'react-router-dom';

import Home from './components/Home';
import Jokes from './components/Jokes';
import Register from './components/Register';
import Signin from './components/Signin';

import { Container } from './styles/GlobalStyles';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Container>
            <nav>
              <NavLink exact to="/">
                Home
              </NavLink>
              &nbsp;|&nbsp;
              <NavLink to="/jokes">Jokes</NavLink>
              &nbsp;|&nbsp;
              <NavLink to="/signin">Sign In</NavLink>
            </nav>
          </Container>
        </header>
        <Route exact path="/" component={Home} />
        <Route path="/jokes" component={Jokes} />
        <Route path="/signin" render={props => <Signin {...props} />} />
        <Route path="/register" render={props => <Register {...props} />} />
      </div>
    );
  }
}

export default App;

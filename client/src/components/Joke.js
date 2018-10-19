import React from 'react';

function Joke(props) {
  return (
    <div>
      <div>
        <h3>{props.joke.setup}</h3>
        <p>{props.joke.punchline}</p>
      </div>
    </div>
  );
}

export default Joke;

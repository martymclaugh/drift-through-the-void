// @flow
import React, { Component } from 'react';
import HeadQuarters from './components/HeadQuarters/HeadQuarters'

class App extends Component {
  render() {
    return (
      <div className="App">
        <HeadQuarters terminalAmount={6} />
      </div>
    );
  }
}

export default App;

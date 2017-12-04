// @flow
import React from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import PlayerBoard from './PlayerBoard/PlayerBoard';
import LobbyScreen from './LobbyScreen/LobbyScreen';
import HomeScreen from './HomeScreen/HomeScreen';

import '../assets/styles/base.css';

const App = () => (
  <Router>
    <div>
      <Route path="/play" component={PlayerBoard} />
      <Route path="/lobby" component={LobbyScreen} />
      <Route exact path="/" component={HomeScreen} />
    </div>
  </Router>
);

export default App;

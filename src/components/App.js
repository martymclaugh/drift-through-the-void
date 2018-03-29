// @flow

import React from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import GameScreen from './GameScreen/GameScreen';
import LobbyScreen from './LobbyScreen/LobbyScreen';
import HomeScreen from './HomeScreen/HomeScreen';
import '../assets/styles/base.css';

const App = () => (
  <Router>
    <div>
      <Route exact path="/" component={HomeScreen} />
      <Route path="/lobby" component={LobbyScreen} />
      <Route path="/game/:slug" component={GameScreen} />
    </div>
  </Router>
);

export default App;

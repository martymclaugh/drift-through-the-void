// @flow

import React from 'react';
import { Props } from '../../../../flow/components/game-list-types';

import './games-list-styles.css';

export default (props: Props) => {
  if (props.games.size > 0) {
    return props.games.map(game => (
      <div
        key={game.server}
        onClick={() => props.handleGameClick(game)}
        className="game"
      >
        <span className="game__text">{game.server.replace('-', ' ')}</span>
        <span className="game__user">{game.user}</span>
        {game.isPrivate && <span role="img" aria-labelledby="private" className="game__text">&#128274;</span>}
      </div>
    ));
  }
  return <div className="no-games">No games at this time...</div>
}

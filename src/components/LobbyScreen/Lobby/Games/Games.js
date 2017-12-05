// @flow

import React from 'react';

export default (props) => {
  if (props.games.size > 0) {
    return props.games.map(game => (
      <div
        key={game.server}
        onClick={() => props.handleGameClick(game)}
        className="game"
      >
        <span className="game__text">{game.server}</span>
        <span className="game__user">{game.user}</span>
        {game.isPrivate && <span className="game__text">&#128274;</span>}
      </div>
    ));
  }
  return <div className="no-games">No games at this time...</div>
}

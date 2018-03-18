// @flow

import React from 'react';
import { Props } from '../../../../flow/components/game-list-types';
import colonistGreen from '../../../../assets/images/resource-images/colonist-green.png';
import colonistBlack from '../../../../assets/images/resource-images/colonist-black.png';

import './games-list-styles.css';

const renderPlayers = (game) => {
  let players = [];
  for (let i = 0; i < game.get('numberOfPlayers'); i++) {
    players.push(
      <img key={i} className="game__players-image" src={i < game.get('playersJoined') ? colonistGreen : colonistBlack} alt=""/>
    )
  }

  return players;
}

export default (props: Props) => {
  const { games } = props;
  if (games.size > 0) {
    return games.keySeq().toArray().map(server => {
      const game = games.get(server);

      return (
        <div
          key={server}
          onClick={() => props.handleGameClick(game)}
          className="game"
        >
          <div className="game__players">
            {renderPlayers(game)}
          </div>
          <span className="game__text">{server.replace('-', ' ')}</span>
          <span className="game__user">{game.get('user')}</span>
          {game.get('isPrivate') && <span role="img" aria-labelledby="private" className="game__text">&#128274;</span>}
        </div>
      )
    });
  }
  return <div className="no-games">No games at this time...</div>
}

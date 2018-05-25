// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateCargo, startGame, changePhase } from '../GameScreen/game-screen-actions';
import { sendCargo } from '../../redux/middlewares/socket/Game/game-actions';
import { reduceObjectValues } from '../../helpers/reduce-object-value';
// import disasters from '../../helpers/disasters';
import HeadQuarters from '../HeadQuarters/HeadQuarters';
import ResourceDisplay from '../ResourceDisplay/ResourceDisplay';
import { Props, State } from '../../flow/components/generate-resources-types';

import './generate-resources-styles.css';

class GenerateResources extends Component<Props, State>{

  constructor(props: Props) {
    super(props)

    this.state = {
    }

    this.updateCargo = this.updateCargo.bind(this);
    this.handleDisasters = this.handleDisasters.bind(this);
  }
  handleDisasters: () => void;
  handleDisasters(disasters) {

  }
  updateCargo: () => void;
  updateCargo() {
    const {
      terminals,
      cargo,
      soylentGenerator,
      cryptoMiner,
      pandoraGateway,
    } = this.props;

    const disasters = reduceObjectValues(terminals, 'disasters');
    const resources = reduceObjectValues(terminals, 'resources')

    let cargoItems = {
      colonists: cargo.get('colonists'),
      soylent: soylentGenerator ? cargo.get('soylent') * 2 : cargo.get('soylent'),
      credits: cryptoMiner ? cargo.get('credits') * 2 : cargo.get('credits'),
    }

    let distributedResources = cargo.get('distributedResources').toJS();

    const resourceKeys = Object.keys(distributedResources);

    Object.keys(cargoItems).map(key => {
      const resourceValue = reduceObjectValues(terminals, key);

      // handle soylent and credit upgrades
      if ((key === 'soylent' && soylentGenerator) || (key === 'credits' && cryptoMiner)) {
        cargoItems[key] = cargoItems[key] + (resourceValue * 2);
      } else {
        cargoItems[key] = cargoItems[key] + resourceValue;
      }

      return cargoItems;
    });
    for (var i = 0; i < resources; i ++) {
      const key = resourceKeys[i % resourceKeys.length];

      // handle unobtanium upgrade
      distributedResources[key] = pandoraGateway && key === 'unobtanium' ?
                                    distributedResources[key] + 2 :
                                    distributedResources[key] + 1;
    }

    const distributedItems = {
      ...cargoItems,
      distributedResources,
    }
    const payload = {
      data: distributedItems,
    }
    this.handleDisasters({ disasters });
    this.props.updateCargo(distributedItems);
    this.props.sendCargo(distributedItems);

    setTimeout(() => {
      this.props.changePhase();
    }, 1500)
  }
  render() {
    const { planets } = this.props;
    const planetsArray = planets.keySeq().toArray();

    const numberOfTerminals = planetsArray.filter(key =>
      ( planets.getIn([key, 'requiredColonists']) === 0 )).length;

    return (
      <div className="generate-resources">
        <ResourceDisplay
          changePhase={this.props.changePhase}
        />
        <HeadQuarters
          terminalAmount={numberOfTerminals}
          updateCargo={this.updateCargo}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  const activePlayer = state.gameScreen.get('activePlayer');

  return {
    numberOfHacks: state.headQuarters.get('numberOfHacks'),
    terminals: state.headQuarters.get('terminals'),
    numberOfPlayers: state.gameScreen.get('numberOfPlayers'),
    playersJoined: state.gameScreen.get('playersJoined'),
    gameStarted: state.gameScreen.get('gameStarted'),
    users: state.gameScreen.get('users'),
    cargo: state.gameScreen.getIn(['users', `${activePlayer}`, 'resources']),
    games: state.lobby.get('games'),
    planets: state.gameScreen.getIn(['users', `${activePlayer}`, 'planets']),
    soylentGenerator: state.gameScreen.getIn(['users', `${activePlayer}`, 'upgrades', 'soylentGenerator']),
    cryptoMiner: state.gameScreen.getIn(['users', `${activePlayer}`, 'upgrades', 'cryptoMiner']),
    pandoraGateway: state.gameScreen.getIn(['users', `${activePlayer}`, 'upgrades', 'pandoraGateway']),
  };
}

export default connect(mapStateToProps, {
  updateCargo,
  sendCargo,
  changePhase,
})(GenerateResources);

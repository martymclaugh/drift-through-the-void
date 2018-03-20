import React, { Component } from 'react';
import { connect } from 'react-redux';
import { colonizePlanet, changePhase } from '../GameScreen/game-screen-actions';
import planetImagePaths from './planet-image-paths';
import Planet from '../shared/Planet/Planet';
import Button from '../shared/Button/Button';

import './planets-container-styles.css';

const NUMBER_OF_PLANETS = 7;

class PlanetContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      finishedColonizing: false,
    }

    this.renderPlanets = this.renderPlanets.bind(this);
    this.handlePlanetClick = this.handlePlanetClick.bind(this);
  }
  handlePlanetClick: () => void;
  handlePlanetClick(name) {
    const {
      planets,
      colonists,
      colonizePlanet,
      isActivePlayer,
    } = this.props;

    if (planets.getIn([name, 'requiredColonists']) > 0 && colonists > 0 && isActivePlayer) {
      colonizePlanet({ name });
    }
  }
  finishColonizing() {
    this.setState({ finishedColonizing: true });

    setTimeout(() => {
      this.props.changePhase();
    }, 2000)
  }
  renderPlanets: () => void;
  renderPlanets() {
    const { finishedColonizing } = this.state;
    let planets = [];
    const planetKeys = Object.keys(this.props.planets.toJS());
    const radius = 15;
    const width = 30;
    const height = 30;
    const planetWidth = 6;
    let angle = 0, step = (2 * Math.PI) / NUMBER_OF_PLANETS;

    for (let i = 0; i < NUMBER_OF_PLANETS; i++) {
      var x = !finishedColonizing ? Math.round(width / 2 + radius * Math.cos(angle) - planetWidth / 2) : 15;
      var y = !finishedColonizing ? Math.round(height / 2 + radius * Math.sin(angle) - planetWidth / 2) : 15;

      planets.push(
        <Planet
          positioning={{ x, y }}
          canColonize={this.props.colonists > 0}
          isActivePlayer={this.props.isActivePlayer}
          onClick={() => this.handlePlanetClick(planetKeys[i])}
          planetImage={planetImagePaths[`planet-${i + 1}`].imagePath}
          requiredColonists={this.props.planets.getIn([`${planetKeys[i]}`, 'requiredColonists'])}
        />
      )
      angle += step;
    }

    return planets;
  }
  render() {
    const { isActivePlayer } = this.props;
    const button = isActivePlayer && !this.state.finishedColonizing && (
      <Button onClick={() => this.finishColonizing()}>
        Finish Colonizing
      </Button>
    )
    return (
      <div className="planets">
        <div className="planets-container">
          {this.renderPlanets()}
        </div>

        <div className="colonize__button">
          {button}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  planets: state.gameScreen.getIn(['users', `${state.gameScreen.get('activePlayer')}`, 'planets']),
  colonists: state.gameScreen.getIn(['users', `${state.gameScreen.get('activePlayer')}`, 'resources', 'colonists']),
  isActivePlayer: state.homeScreen.get('username') === state.gameScreen.get('activePlayer'),
});

export default connect(mapStateToProps, {
  colonizePlanet,
  changePhase,
})(PlanetContainer);

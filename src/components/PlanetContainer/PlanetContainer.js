import React, { Component } from 'react';
import { connect } from 'react-redux';
import { colonizePlanet } from './planet-actions';
import planetImagePaths from './planet-image-paths';
import Planet from '../shared/Planet/Planet';

import './planet-container-styles.css';

const NUMBER_OF_PLANETS = 7;

class PlanetContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {}

    this.renderPlanets = this.renderPlanets.bind(this);
    this.handlePlanetClick = this.handlePlanetClick.bind(this);
  }
  handlePlanetClick: () => void;
  handlePlanetClick(name) {
    const {
      planets,
      colonists,
      colonizePlanet
    } = this.props;
    if (planets.getIn([name, 'requiredColonists']) > 0 && colonists > 0) {
      colonizePlanet(name);
    }
  }
  renderPlanets: () => void;
  renderPlanets() {
    let planets = [];
    const planetKeys = Object.keys(this.props.planets.toJS());
    for (let i = 0; i < NUMBER_OF_PLANETS; i++) {
      planets.push(
        <Planet
          canColonize={this.props.colonists > 0}
          onClick={() => this.handlePlanetClick(planetKeys[i])}
          planetImage={planetImagePaths[`planet-${i + 1}`].imagePath}
          requiredColonists={this.props.planets.getIn([`${planetKeys[i]}`, 'requiredColonists'])}
        />
      )
    }
    return planets;
  }
  render() {
    return (
      <div className="planet-container">
        {this.renderPlanets()}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  planets: state.planets,
  colonists: state.playerBoard.get('colonists'),
});

export default connect(mapStateToProps, { colonizePlanet })(PlanetContainer);

// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import CargoContainer from './CargoContainer/CargoContainer';
import SoylentContainer from './SoylentContainer/SoylentContainer';
import ColonistIcon from './ColonistIcon/ColonistIcon';
import CreditsIcon from './CreditsIcon/CreditsIcon';
import { selectResource } from '../Upgrades/upgrades-actions';
import { Props, State } from '../../flow/components/resource-display-types';
import './resource-display-styles.css';

class ResourceDisplay extends Component<Props, State> {
  constructor(props) {
    super(props);

    this.state = {}

    this.renderCargoContainers = this.renderCargoContainers.bind(this);
    this.handleSelectResource = this.handleSelectResource.bind(this);
  }
  handleSelectResource: () => void;
  handleSelectResource(resource) {
    if (this.props.isActivePlayer) {
      this.props.selectResource(resource)
    }
  }
  renderCargoContainers: () => void;
  renderCargoContainers() {
    const distributedResources = this.props.distributedResources.toJS();
    const containers = Object.keys(distributedResources).map(key => (
      <CargoContainer
        selectedResources={this.props.selectedResources}
        isActivePlayer={this.props.isActivePlayer}
        handleSelectResource={this.handleSelectResource}
        phase={this.props.phase}
        engine={this.props.engine}
        amount={distributedResources[key]}
        name={key}
      />
    ));

    return containers.reverse();
  }

  render() {
    return (
      <div className="resource-display">
        <div className="resource-display__left">
          {this.renderCargoContainers()}
        </div>
        <div className="resource-display__right">
          <ColonistIcon colonists={this.props.colonists} />
          <CreditsIcon credits={this.props.credits} />
        </div>
        <SoylentContainer
          selectedResources={this.props.selectedResources}
          isActivePlayer={this.props.isActivePlayer}
          handleSelectResource={this.handleSelectResource}
          soylent={this.props.soylent}
          phase={this.props.phase}
          soylentGenerator={this.props.soylentGenerator}
        />
      </div>
    )
  }
}

const mapStateToProps = state => {
  const activePlayer = state.gameScreen.get('activePlayer');
  const resources = state.gameScreen.getIn(['users', `${activePlayer}`, 'resources']);

  return ({
    isActivePlayer: state.homeScreen.get('username') === activePlayer,
    distributedResources: resources.get('distributedResources'),
    colonists: resources.get('colonists'),
    soylent: resources.get('soylent'),
    credits: resources.get('credits'),
    phase: state.gameScreen.get('phase'),
    soylentGenerator: state.gameScreen.getIn(['users', `${activePlayer}`, 'upgrades', 'soylentGenerator']),
    engine: state.gameScreen.getIn(['users', `${activePlayer}`, 'upgrades', 'engine']),
    selectedResources: state.upgrades.get('selectedResources'),
  });
}

export default connect(mapStateToProps, { selectResource })(ResourceDisplay);

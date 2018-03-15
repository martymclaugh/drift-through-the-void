// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import CargoContainer from './CargoContainer/CargoContainer';
import SoylentContainer from './SoylentContainer/SoylentContainer';
import ColonistIcon from './ColonistIcon/ColonistIcon';
import CreditsIcon from './CreditsIcon/CreditsIcon';
import { Props, State } from '../../flow/components/resource-display-types';
import './resource-display-styles.css';

class ResourceDisplay extends Component<Props, State> {
  constructor(props) {
    super(props);

    this.state = {}

    this.renderCargoContainers = this.renderCargoContainers.bind(this);
  }
  renderCargoContainers: () => void;
  renderCargoContainers() {
    const distributedResources = this.props.distributedResources.toJS();
    const containers = Object.keys(distributedResources).map(key => (
      <CargoContainer
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
        <SoylentContainer soylent={this.props.soylent} />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  distributedResources: state.gameScreen.getIn(['resources', 'distributedResources']),
  colonists: state.gameScreen.getIn(['resources', 'colonists']),
  soylent: state.gameScreen.getIn(['resources', 'soylent']),
  credits: state.gameScreen.getIn(['resources', 'credits']),
});

export default connect(mapStateToProps, {  })(ResourceDisplay);

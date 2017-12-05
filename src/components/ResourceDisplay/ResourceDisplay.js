// @flow

import React, { Component } from 'react';
import { toJS } from 'immutable';
import { connect } from 'react-redux';
import CargoContainer from '../shared/CargoContainer/CargoContainer';
import SoylentContainer from '../SoylentContainer/SoylentContainer';
import ColonistIcon from '../ColonistIcon/ColonistIcon';

import './resource-display-styles.css';

class ResourceDisplay extends Component {
  constructor(props) {
    super(props);

    this.state = {}

    this.renderCargoContainers = this.renderCargoContainers.bind(this);
  }

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
    const { distributedResources } = this.props;
    return (
      <div className="resource-display">
        Cargo Hold
        <ColonistIcon colonists={this.props.colonists} />
        {this.renderCargoContainers()}
        colonists: {this.props.colonists}
        soylent: {this.props.soylent}
        credits: {this.props.credits}
        <SoylentContainer soylent={this.props.soylent} />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  distributedResources: state.playerBoard.get('distributedResources'),
  colonists: state.playerBoard.get('colonists'),
  soylent: state.playerBoard.get('soylent'),
  credits: state.playerBoard.get('credits'),
});

export default connect(mapStateToProps, {  })(ResourceDisplay);

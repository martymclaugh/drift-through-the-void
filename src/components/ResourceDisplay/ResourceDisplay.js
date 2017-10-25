import React, { Component } from 'react';
import { toJS } from 'immutable';
import { connect } from 'react-redux';
import CargoContainer from '../shared/CargoContainer/CargoContainer';

import './resource-display-styles.css';

class ResourceDisplay extends Component {
  constructor(props) {
    super(props);

    this.state = {}

    this.renderCargoContainers = this.renderCargoContainers.bind(this);
  }

  renderCargoContainers() {
    const distributedResources = this.props.distributedResources.toJS();
    let containers = [];

    for (var key in distributedResources){
      if (distributedResources.hasOwnProperty(key)){
        containers.push(
          <CargoContainer
            amount={distributedResources[key]}
            name={key}
          />
        )
      }
    }

    return containers.reverse();
  }

  render() {
    return (
      <div className="resource-display">
        Cargo Hold
        {this.renderCargoContainers()}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  distributedResources: state.playerBoard.get('distributedResources'),
});

export default connect(mapStateToProps, {  })(ResourceDisplay);

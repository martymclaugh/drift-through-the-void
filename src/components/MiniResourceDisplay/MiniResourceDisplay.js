import React, { Component } from 'react';
import { connect } from 'react-redux';
import { resourceMap } from '../../helpers/resource-map';
import { calculateResourcePoints } from '../../helpers/resource-point-converter';
import colonistGreen from '../../assets/images/resource-images/colonist-green.png';
import creditsGreen from '../../assets/images/terminal-images/credits-green.png';
import heart from '../../assets/images/resource-images/heart.png';

import './mini-resource-display-styles.css';

class MiniResourceDisplay extends Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.renderDistributedResources = this.renderDistributedResources.bind(this);
  }
  renderDistributedResources() {
    const distributedResources = this.props.distributedResources.toJS();

    return Object.keys(distributedResources).map(key => (
      <div className="mini-resource">
        <img className="mini-resource__asset" src={resourceMap[key].greenImg} alt=""/>
        <div className="points">{calculateResourcePoints(key, distributedResources[key])}</div>
      </div>
    ));
  }
  render() {
    const {
      colonists,
      soylent,
      credits,
      // hitPoints,
      isActive,
    } = this.props;

    return (
      <div className={`mini-resource-display ${isActive ? 'is-active' : ''}`}>
        <div className="active-player">{this.props.activePlayer}</div>
        <div className="mini-resource">
          <img className="mini-resource__asset" src={colonistGreen} alt=""/>
          <div className="points">{colonists}</div>
        </div>
        <div className="mini-resource">
          <img className="mini-resource__asset soylent" src={resourceMap['soylent'].greenImg} alt=""/>
          <div className="points">{soylent}</div>
        </div>
        <div className="mini-resource">
          <img className="mini-resource__asset credits" src={creditsGreen} alt=""/>
          <div className="points">{credits}</div>
        </div>
        {this.renderDistributedResources()}
        <div className="mini-resource">
          <img className="mini-resource__asset" src={heart} alt=""/>
          {/* <div className="points">{hitPoints}</div> */}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  const activePlayer = state.gameScreen.get('activePlayer');
  const resources = state.gameScreen.getIn(['users', `${activePlayer}`, 'resources']);

  return ({
    distributedResources: resources.get('distributedResources'),
    colonists: resources.get('colonists'),
    soylent: resources.get('soylent'),
    credits: resources.get('credits'),
    activePlayer: activePlayer,
  });
}

export default connect(mapStateToProps, null)(MiniResourceDisplay);

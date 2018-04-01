import React, { Component } from 'react';
import { connect } from 'react-redux';
import { resourceMap } from '../../helpers/resource-map';
import { calculateResourcePoints } from '../../helpers/resource-point-converter';
import { gamePhases } from '../../helpers/game-phases';
import { selectResource } from '../Upgrades/upgrades-actions';
import colonistGreen from '../../assets/images/resource-images/colonist-green.png';
import creditsGreen from '../../assets/images/terminal-images/credits-green.png';
import heart from '../../assets/images/resource-images/heart.png';

import './mini-resource-display-styles.css';

class MiniResourceDisplay extends Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.renderDistributedResources = this.renderDistributedResources.bind(this);
    this.handleResourceClick = this.handleResourceClick.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.credits && nextProps.canSpendResources && !nextProps.selectedResources.get('credits')) {
      nextProps.selectResource({ credits: nextProps.credits });
    }
  }
  renderDistributedResources() {
    const distributedResources = this.props.distributedResources.toJS();
    const {
      selectedUpgrade,
      selectedResources,
      phase,
    } = this.props;

    const discardingResources = phase === gamePhases.DISCARD_RESOURCES;

    return Object.keys(distributedResources).reverse().map(key => {
      const points = calculateResourcePoints(key, distributedResources[key])
      const isActive = (distributedResources[key] && selectedUpgrade.size) || discardingResources;

      return (
        <div
          onClick={() => this.handleResourceClick({ [key]: points })}
          className={
            `mini-resource ${isActive ? 'is-active' : ''} ${selectedResources.get(key) ? 'is-selected' : ''}`
          }
        >
          <img className="mini-resource__asset" src={resourceMap[key].greenImg} alt=""/>
          <div className="points">{points}</div>
        </div>
      )
    });
  }
  handleResourceClick(resource) {
    const {
      canSpendResources,
      distributedResources,
      isActivePlayer,
      selectResource,
      phase,
    } = this.props;

    const spendingResources = isActivePlayer && canSpendResources && distributedResources.get(`${Object.keys(resource)[0]}`)
    const discardingResources = isActivePlayer && phase === gamePhases.DISCARD_RESOURCES;

    if (spendingResources || discardingResources)  {
      selectResource(resource)
    }
  }
  render() {
    const {
      colonists,
      soylent,
      credits,
      hitPoints,
      isActive,
      selectedUpgrade,
      selectedResources,
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
        <div
          onClick={() => this.handleResourceClick({ credits })}
          className={
            `mini-resource ${credits && selectedUpgrade.size ? 'is-active' : ''} ${selectedResources.get('credits') ? 'is-selected' : ''}`
          }
        >
          <img className="mini-resource__asset credits" src={creditsGreen} alt=""/>
          <div className="points">{credits}</div>
        </div>
        {this.renderDistributedResources()}
        <div className="mini-resource">
          <img className="mini-resource__asset" src={heart} alt=""/>
          <div className="points">{hitPoints}</div>
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
    hitPoints: state.gameScreen.getIn(['users', `${activePlayer}`, 'hitPoints']),
    selectedUpgrade: state.upgrades.get('selectedUpgrade'),
    selectedResources: state.upgrades.get('selectedResources'),
    canSpendResources: state.gameScreen.get('phase') === gamePhases.PURCHASE_UPGRADES,
    isActivePlayer: state.homeScreen.get('username') === activePlayer,
    phase: state.gameScreen.get('phase'),
    activePlayer,
  });
}

export default connect(mapStateToProps, { selectResource })(MiniResourceDisplay);

import React, { Component } from 'react';
import { Map } from 'immutable';
import upgrades from '../../helpers/upgrades';
import { connect } from 'react-redux';
import { selectUpgrade } from './upgrades-actions';
import { purchaseUpgrade, changePhase } from '../GameScreen/game-screen-actions';

import './upgrades-styles.css';

class Upgrades extends Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.handleSelectUpgrade = this.handleSelectUpgrade.bind(this);
    this.handlePurchaseUpgrade = this.handlePurchaseUpgrade.bind(this);
  }
  handleSelectUpgrade(upgrade) {
    const selectedUpgrade = this.props.selectedUpgrade.get('id') === upgrade.id ? Map() : upgrade;

    if (this.props.isActivePlayer) {
      this.props.selectUpgrade({
        selectedUpgrade,
      });
    }
  }
  handlePurchaseUpgrade() {
    const {
      isActivePlayer,
      purchaseUpgrade,
      selectedUpgrade,
      selectedResources,
    } = this.props;

    if (isActivePlayer) {
      purchaseUpgrade({
        selectedUpgrade: selectedUpgrade.toJS(),
        selectedResources: selectedResources.toJS(),
      });
      this.props.changePhase();
    }
  }
  renderUpgrades() {
    return Object.keys(upgrades).map(upgrade => {
      const button = this.props.upgrades.get(upgrade) ?
        <div className="checkmark">&#10003;</div> :
      (
        <div
          className={`button__radio ${upgrade === this.props.selectedUpgrade.get('id') ? 'is-active' : ''}`}
          onClick={() => this.handleSelectUpgrade(upgrades[upgrade])}
        />
      );
      return (
        <div className="upgrade">
          <div className="upgrade__content">
            <div className="upgrade__cost">{upgrades[upgrade].cost}</div>
            <div className="button">
              {button}
            </div>
            <div className="upgrade__name">{upgrades[upgrade].name}</div>
            <div className="upgrade__points">{upgrades[upgrade].points}</div>
            <div className="upgrade__effect">{upgrades[upgrade].effect}</div>
          </div>
        </div>
      )
    });
  }
  render() {
    const { selectedUpgrade, selectedResources } = this.props;
    const totalAmountSpent = Object.keys(selectedResources.toJS()).reduce((prev, curr) =>
      ( prev + selectedResources.get(curr) ), 0);

    const canPurchaseUpgrade = selectedUpgrade.size > 0 && totalAmountSpent >= selectedUpgrade.get('cost');

    // TODO move button to separate component
    const upgradeButton = canPurchaseUpgrade ? (
      <div
        className="button__upgrade"
        onClick={this.handlePurchaseUpgrade}
      >
        Upgrade
      </div>
    ) : 'Not enough resources.';
    const skipButton = (
      <div
        className="button__upgrade"
        onClick={() => this.props.changePhase()}
      >
        I'm Good
      </div>
    )

    return (
      <div className="upgrades-container">
        <div className="upgrades">
          <div className="upgrade">
            <div className="title__content">
              <div className="title__cost">Cost</div>
              <div className="title__select">Select</div>
              <div className="title__name">Name</div>
              <div className="title__points">Points</div>
              <div className="title__effect">Effect</div>
            </div>
          </div>
          {this.renderUpgrades()}
        </div>
        <div className="upgrades__purchase">
          <div className="upgrades__purchase-content">
            <div className="upgrades__purchase-text">Select Upgrade:</div>
            <div className="upgrades__purchase-name">
              {selectedUpgrade.size > 0 && selectedUpgrade.get('name')}
            </div>
            <div className="upgrades__purchase-cost">{selectedUpgrade.size > 0 && `cost: ${selectedUpgrade.get('cost')}`}</div>
            <div className="spending">
              Spending: {totalAmountSpent}
            </div>
            <div className="can-upgrade">
              {selectedUpgrade.size > 0 ? upgradeButton : skipButton}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const activePlayer = state.gameScreen.get('activePlayer');
  const resources = state.gameScreen.getIn(['users', `${activePlayer}`, 'resources']);

  return ({
    selectedUpgrade: state.upgrades.get('selectedUpgrade'),
    credits: resources.get('credits'),
    selectedResources: state.upgrades.get('selectedResources'),
    isActivePlayer: state.homeScreen.get('username') === activePlayer,
    upgrades: state.gameScreen.getIn(['users', `${activePlayer}`, 'upgrades']),
  });
}

export default connect(mapStateToProps, {
  selectUpgrade,
  purchaseUpgrade,
  changePhase,
})(Upgrades);

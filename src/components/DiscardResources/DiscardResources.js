import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '../shared/Button/Button';
import { purchaseUpgrade, changePhase } from '../GameScreen/game-screen-actions';

import './discard-resources-styles.css';

class DiscardResources extends Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.renderResources = this.renderResources.bind(this);
    this.discardResources = this.discardResources.bind(this);
  }
  componentDidMount() {
    if (this.calculateTotal() <= 6 || this.props.spaceVaults) {
      this.props.changePhase();
    }
  }
  renderResources: () => void;
  renderResources() {
    const { selectedResources } = this.props;
    const distributedResources = this.props.distributedResources.toJS();

    return Object.keys(distributedResources).reverse().map(key => (
      <div className="resource">
        {key.replace(/([A-Z]+)*([A-Z][a-z])/g, "$1 $2")}: <span className="value">
          {selectedResources.get(key) ? 0 : distributedResources[key]}
        </span>
      </div>
    ));
  }
  calculateTotal: () => void;
  calculateTotal() {
    const { distributedResources, selectedResources } = this.props;
    return Object.keys(distributedResources.toJS()).reduce((acc, curr) => (

      // if resource is selected, don't add it, otherwise add it to total
      selectedResources.get(curr) ? acc + 0 : acc + distributedResources.get(curr)
    ), 0);
  }
  discardResources: () => void;
  discardResources() {
    const {
      purchaseUpgrade,
      isActivePlayer,
      selectedResources,
    } = this.props;

    if (isActivePlayer) {
      // purchase upgrade can be used to just discard resources as well
      purchaseUpgrade({
        selectedResources: selectedResources.toJS(),
      });
      this.props.changePhase();
    }
  }
  render() {
    const total = this.calculateTotal();
    const button = total <= 6 && (
      <Button
        onClick={this.discardResources}
        pressableButton
      >
        Discard
      </Button>
    );

    return (
      <div className="discard-resources">
        <div className="discard-resources__content">
          <div className="title">
            DISCARD RESOURCES
          </div>
          <div className="description">
            You must discard resources in excess of 6 without <i>Space Vaults</i>
          </div>
          <div className="resources">
            {this.renderResources()}
          </div>
          <div className={`total ${total > 6 ? 'red' : 'green'}`}>Total: {total}</div>
          <div className="button">
            {button}
          </div>
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
    selectedResources: state.upgrades.get('selectedResources'),
    spaceVaults: state.gameScreen.getIn(['users', `${activePlayer}`, 'upgrades', 'spaceVaults']),
    isActivePlayer: state.homeScreen.get('username') === activePlayer,
  });
}

export default connect(mapStateToProps, { purchaseUpgrade, changePhase })(DiscardResources);

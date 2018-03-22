import React, { Component } from 'react';
import upgrades from '../../helpers/upgrades';

class UpgradesContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedUpgrade: '',
    };
    this.handleUpgradeChange = this.handleUpgradeChange.bind(this);
  }
  handleUpgradeChange(event) {
    this.setState({
      selectedUpgrade: event.target.value,
    });
  }
  renderUpgrades() {
    return Object.keys(upgrades).map(upgrade => (
      <div className="upgrade">
        <label>
          <input
            type="radio"
            value={upgrade}
            checked={this.state.selectedUpgrade === upgrade}
            onChange={(event) => this.handleUpgradeChange(event)}
          />
          {upgrades[upgrade].name}
        </label>
      </div>
    ));
  }
  render() {
    return (
      <div className="upgrades">
        <form action=".">
          {this.renderUpgrades()}
        </form>
      </div>
    );
  }
}

export default UpgradesContainer;

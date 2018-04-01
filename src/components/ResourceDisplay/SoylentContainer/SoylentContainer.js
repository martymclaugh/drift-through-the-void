// @flow

import React, { Component } from 'react';
import { resourceMap } from '../../../helpers/resource-map';
import { Props, State } from '../../../flow/components/soylent-container-types';
import { gamePhases } from '../../../helpers/game-phases';

import './soylent-container-styles.css';

class SoylentContainer extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      amount: 0,
    };

    this.renderSoylentIcons = this.renderSoylentIcons.bind(this);
    this.powerUpSoylent = this.powerUpSoylent.bind(this);
  }
  componentDidMount() {
    this.powerUpSoylent(this.props.soylent);
  }
  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.soylent > this.props.soylent) {
      this.powerUpSoylent(nextProps.soylent);
    }
  }
  renderSoylentIcons: () => void;
  renderSoylentIcons(){
    const { soylent } = resourceMap;
    let icons = [];


    for (let i = 0; i < soylent.maxAmount; i++){
      const canTrade = this.props.soylentGenerator &&
                       this.props.phase === gamePhases.TRADE_RESOURCES &&
                       i < this.state.amount;

      let imgSrc = i < this.state.amount ? soylent.greenImg : soylent.blackImg;
      if (canTrade) { imgSrc = soylent.yellowImg; }

      const isSelected = i >= this.props.selectedResources.get('soylent') - 1;

      icons.push(
        <div
          // we have to add 1 to the index since 0 is falsy for the check in upgrades reducer
          onClick={canTrade && this.props.isActivePlayer ? () => this.props.handleSelectResource({ soylent: i + 1 }) : null}
          className={`soylent-container__asset ${canTrade ? 'is-tradable' : ''} ${isSelected ? 'is-selected' : ''}`}
        >
          <img className="soylent-container__asset-image" key={i} src={imgSrc} alt=""/>
        </div>
      )
    }
    return icons;
  }
  powerUpSoylent: (num: number) => void;
  powerUpSoylent(num: number) {
    for (let i = 1; i < num + 1; i ++) {
      setTimeout(() => {
        return this.setState({ amount: i });
      }, 50 * (i))
    }
  }
  render() {
    return (
      <div className="soylent-container">
        {this.renderSoylentIcons()}
      </div>
    )
  }
}

export default SoylentContainer;

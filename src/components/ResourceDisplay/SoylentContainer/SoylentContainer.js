// @flow

import React, { Component } from 'react';
import { resourceMap } from '../../../helpers/resource-map';
import { Props, State } from '../../../flow/components/soylent-container-types';

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
      const imgSrc = i < this.state.amount ? soylent.greenImg : soylent.blackImg;
      icons.push(
        <div className="soylent-container__asset">
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
      }, 150 * (i))
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

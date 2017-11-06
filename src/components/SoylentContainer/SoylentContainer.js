import React, { Component } from 'react';
import { resourceMap } from '../../helpers/resource-map';

import './soylent-container-styles.css';
class SoylentContainer extends Component {
  constructor(props) {
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
  componentWillReceiveProps(nextProps) {
    this.powerUpSoylent(nextProps.soylent);
  }
  renderSoylentIcons(){
    const { soylent } = resourceMap;
    let icons = [];
    for (let i = 0; i < soylent.maxAmount; i++ ){
      const imgSrc = i < this.state.amount ? soylent.greenImg : soylent.blackImg;
      icons.push(
        <div className="soylent-container__asset">
          <img className="soylent-container__asset-image" key={i} src={imgSrc} alt=""/>
        </div>
      )
    }
    return icons;
  }
  powerUpSoylent(num) {
    for (let i = 1; i < num + 1; i ++) {
      setTimeout(() => {
        return this.setState({ amount: i });
      }, 150 * (i))
    }
  }
  render() {
    return (
      <div className="soylent-container">
        <div className="soylent-container__title">Soylent: </div>
        {this.renderSoylentIcons()}
      </div>
    )
  }
}

export default SoylentContainer;

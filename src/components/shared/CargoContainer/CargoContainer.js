import React from 'react';
import { resourceMap } from '../../../helpers/resource-map';

import './cargo-container-styles.css';

const renderIcons = (props) => {
  const resource = resourceMap[props.name];
  const maxAmount = resource.maxAmount;
  let icons = [];

  for(var i = 1; i < maxAmount + 1; i++) {
    const isActive = i < props.amount + 1;
    const imgSource = isActive ? resource.greenImg : resource.blackImg;

    icons.push(
      <div className="icon">
        <div className="icon__value">{i * resource.firstVal}</div>
        <div className="icon__asset">
          <img className={`icon__asset-image ${isActive ? 'is-active' : ''}`} src={imgSource} alt=""/>
        </div>
      </div>
    )
  }

  return icons;
}
export default (props) => {
  const totalValue = resourceMap[props.name].firstVal * props.amount;

  return (
    <div>{totalValue}{renderIcons(props)}</div>
  )
}

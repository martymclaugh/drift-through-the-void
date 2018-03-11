// @flow

import React from 'react';
import { resourceMap } from '../../../helpers/resource-map';
import { Props } from '../../../flow/components/cargo-container-types';

import './cargo-container-styles.css';

const resourceBar = (props: Props) => {
  const resource = resourceMap[props.name];
  const maxAmount = resource.maxAmount;
  let resourcePoints = [];
  const imgSource = resource.greenImg;
  const pointBoxWidth = 100 / maxAmount;

  for (let i = 1; i < maxAmount + 1; i++) {
    const isActive = i === props.amount;

    resourcePoints.push(
      <div style={{ width: `${pointBoxWidth}%` }} className={`resource__points-box ${isActive ? 'is-active' : ''}`}>
        <div className="resource__value">{i * resource.firstVal}</div>
      </div>
    );
  }

  return (
    <div className="resource">
      <img className="resource__asset" src={imgSource} alt=""/>
      <div className="resource__points">{resourcePoints}</div>
    </div>
  )
}
export default (props: Props) => {
  const totalValue = resourceMap[props.name].firstVal * props.amount;

  return (
    <div>{resourceBar(props)}<span>{totalValue}</span></div>
  )
}

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
    const isActive = i < props.amount + 1;

    resourcePoints.push(
      <div className={`resource__points-box ${isActive ? 'is-active' : ''}`}>
        <div className="resource__value">{i * resource.increment}</div>
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
  const totalValue = resourceMap[props.name].increment * props.amount;

  return (
    <div>{resourceBar(props)}</div>
  )
}

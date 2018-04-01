// @flow

import React from 'react';
import { resourceMap } from '../../../helpers/resource-map';
import { gamePhases } from '../../../helpers/game-phases';
import { Props } from '../../../flow/components/cargo-container-types';

import './cargo-container-styles.css';

const resourceBar = (props: Props) => {
  const {
    name,
    phase,
    engine,
    amount,
    isActivePlayer
  } = props;
  const resource = resourceMap[name];
  const maxAmount = resource.maxAmount;
  let resourcePoints = [];
  const imgSource = resource.greenImg;
  const pointBoxWidth = 100 / maxAmount;
  const canTrade = name ===  'unobtanium' &&
                   engine &&
                   phase === gamePhases.TRADE_RESOURCES;

  for (let i = 0; i < maxAmount; i++) {
    const isActive = i < amount;
    const isSelected = i >= props.selectedResources.get('unobtanium') - 1;
    const classNames = `resource__points-box ${isActive ? 'is-active' : ''}` +
                       ` ${canTrade && isActive ? 'is-tradable' : ''}` +
                       ` ${isSelected ? 'is-selected' : ''}`;

    resourcePoints.push(
      <div
        // we have to add 1 to the index since 0 is falsy for the check in upgrades reducer
        onClick={canTrade && isActive ? () => props.handleSelectResource({ [name]: i + 1 }) : null}
        className={classNames}
      >
        <div className="resource__value">{(i + 1) * resource.increment}</div>
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

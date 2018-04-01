// @flow

import React from 'react';
import Button from '../Button/Button';
import { gamePhases } from '../../../helpers/game-phases';
import { Props } from '../../../flow/components/control-panel-types';

import './control-panel-styles.css';

const hackControls = (props: Props) => {
  const acceptButtonClasses = [
    `${props.acceptButtonActive ? ' is-active' : ''}`,
    `${!props.hackButtonActive ? ' full-height' : ''}`
  ].join('');
  const hackButtonClasses = [
    `${props.hackButtonActive ? ' is-active' : ''}`,
    `${!props.acceptButtonActive ? ' full-height' : ''}`
  ].join('');
  const placeholderClass = `${!props.acceptButtonActive && !props.hackButtonActive ? ' is-active' : ''}`

  return (
    <div className="hack-controls">
      <div className={`hack-controls__accept${acceptButtonClasses}`}>
        <Button
          onClick={props.handleAccept}
          className={`hack-controls__accept${acceptButtonClasses}`}
        >
          Accept
        </Button>
      </div>
      <div className={`hack-controls__hack${hackButtonClasses}`}>
        <Button
          onClick={props.handleHack}
        >
          Hack
        </Button>
      </div>
      <div className={`hack-controls__placeholder${placeholderClass}`}>
        <Button
          onClick={() => {}}
        >
          Wait
        </Button>
      </div>
    </div>
  );
}

const renderResourceDetails = (resource) => {
  const title = Object.keys(resource)[0];
  const amountSelected = resource[title];
  const returnValue = title === 'soylent' ? `${amountSelected * 6} Credits` : `${amountSelected * 3} Colonists`;

  return (
    <div className="resource-details">{amountSelected} {title} <span className="arrow">&#8652;</span> {returnValue}</div>
  )
}

const tradeControls = (props: Props) => {
  const { selectedResources, resources, isActivePlayer } = props;
  const soylent = selectedResources.get('soylent');
  const unobtanium = selectedResources.get('unobtanium');
  const soylentSelected = resources.get('soylent') - soylent + 1;
  const unobtaniumSelected = resources.getIn(['distributedResources', 'unobtanium']) - unobtanium + 1;

  const tradeButton = (soylent || unobtanium) && isActivePlayer && (
    <div className="button__trade">
      <Button onClick={props.handleTradeResources} className="button__cancel">
        Trade
      </Button>
    </div>
  );
  const cancelButton = isActivePlayer && (
    <div className="button__cancel">
      <Button onClick={props.changePhase}>
        I'm Good
      </Button>
    </div>
  );

  return (
    <div className="trade-controls">
      {cancelButton}
      <div className="trade-controls__content">
        <div className="trade-controls__title">Select resources highlighted in yellow above to trade.</div>
        <div className="trade-controls__resources">
          {soylent && <div className="resource">{renderResourceDetails({ soylent: soylentSelected })}</div>}
          {unobtanium && <div className="resource">{renderResourceDetails({ unobtanium: unobtaniumSelected })}</div>}
        </div>
      </div>
      {tradeButton}
    </div>
  )
}
const renderControls = (props) => {
  if (props.phase === gamePhases.TRADE_RESOURCES) {
    return tradeControls(props);
  } else if (props.phase === gamePhases.GENERATE_RESOURCES) {
    return hackControls(props);
  }
  return null;
}

export default (props: Props) => (
  <div className="control-panel">
    {renderControls(props)}
  </div>
);

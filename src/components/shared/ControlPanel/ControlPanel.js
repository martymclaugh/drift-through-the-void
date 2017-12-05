// @flow

import React from 'react';

import './control-panel-styles.css';
export default (props) => {
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
    <div className="control-panel">
      <button
        onClick={props.handleAccept}
        className={`control-panel__accept${acceptButtonClasses}`}
      >
        Accept Resources
      </button>
      <button
        onClick={props.handleHack}
        className={`control-panel__hack${hackButtonClasses}`}
      >
        Generate Resources
      </button>
      <button className={`control-panel__placeholder${placeholderClass}`}>
        Hold Please
      </button>
    </div>
  );
}

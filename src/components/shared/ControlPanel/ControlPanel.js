// @flow

import React from 'react';
import { Props } from '../../../flow/components/control-panel-types';
import Button from '../Button/Button';

import './control-panel-styles.css';

export default (props: Props) => {
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
      <div className={`control-panel__accept${acceptButtonClasses}`}>
        <Button
          onClick={props.handleAccept}
          className={`control-panel__accept${acceptButtonClasses}`}
        >
          Accept
        </Button>
      </div>
      <div className={`control-panel__hack${hackButtonClasses}`}>
        <Button
          onClick={props.handleHack}
        >
          Hack
        </Button>
      </div>
      <div className={`control-panel__placeholder${placeholderClass}`}>
        <Button
          onClick={() => {}}
        >
          Wait
        </Button>
      </div>
    </div>
  );
}

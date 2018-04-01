// @flow

import React from 'react';
import { Props } from '../../../flow/shared/button-types';

import './button-styles.css';

export default (props: Props) => {
  const buttonType = props.pressableButton ? 'pressable' : 'transparent'
  const isActive = props.isActive ? 'is-active' : '';
  const className = `button__${buttonType} ${isActive}`;

  return (
    <div
      className={className}
      onClick={() => props.onClick()}
    >
      {props.children}
    </div>
  )
}

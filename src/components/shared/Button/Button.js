// @flow

import React from 'react';
import { Props } from '../../../flow/shared/button-types';

import './button-styles.css';

export default (props: Props) => {
  return (
    <button
      className={`button__transparent ${props.isActive ? 'is-active' : ''}`}
      onClick={() => props.onClick()}
    >
      {props.children}
    </button>
  )
}

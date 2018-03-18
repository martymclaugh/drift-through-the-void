// @flow

import React from 'react';
import { Props } from '../../../flow/components/check-box-types';

import './check-box-styles.css'

export default (props: Props) => (
  <div>
    <span
      className={`checkbox ${props.isActive ? 'is-active' : ''}`}
      type="checkbox"
      onClick={props.onClick}
    >{props.isActive && <span>&#10003;</span>}</span>
    <span className="checkbox__text">{props.text}</span>
  </div>
);

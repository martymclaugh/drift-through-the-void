// @flow

import React from 'react';
import creditsGreen from '../../../assets/images/terminal-images/credits-green.png';
// import { Props } from '../../../flow/components/credits-icon-types';

import './credits-icon-styles.css';

export default (props: Props) => (
  <div className="credits-icon">
    <img
      src={creditsGreen}
      alt="credits-icon"
      className="credits-icon__asset"
    />
    <div className="credits-icon__amount">{props.credits}</div>
  </div>
);

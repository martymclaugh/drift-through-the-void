// @flow

import React from 'react';
import colonistGreen from '../../../assets/images/resource-images/colonist-green.png';
// import colonistBlack from '../../../assets/images/resource-images/colonist-black.png'
import { Props } from '../../../flow/components/colonist-icon-types';

import './colonist-icon-styles.css';

export default (props: Props) => (
  <div className="colonist-icon">
    <img
      src={colonistGreen}
      alt="colonist-icon"
      className="colonist-icon__asset"
    />
    <span className="colonist-icon__amount">{props.colonists}</span>
  </div>
);

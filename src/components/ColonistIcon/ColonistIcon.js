// @flow

import React from 'react';
import colonistGreen from '../../assets/images/resource-images/colonist-green.png';
import colonistBlack from '../../assets/images/resource-images/colonist-black.png'
import { Props } from '../../flow/components/colonist-icon-types';

import './colonist-icon-styles.css';

export default (props: Props) => (
  <div className="colonist-icon">
    <img
      src={props.colonists > 0 ? colonistGreen : colonistBlack}
      alt="colonist-icon"
      className="colonist-icon__asset"
    />
    <div className="colonist-icon__amount">{props.colonists}</div>
  </div>
);

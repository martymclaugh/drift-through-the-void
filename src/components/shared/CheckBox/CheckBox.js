import React from 'react';

import './check-box-styles.css'

export default (props) => (
  <div>
    <span
      className={`checkbox ${props.isActive ? 'is-active' : ''}`}
      type="checkbox"
      onClick={props.onClick}
    >{props.isActive && <span>&#10003;</span>}</span>
    <span className="checkbox__text">{props.text}</span>
  </div>
);

import React from 'react';

import './monument-styles.css';

const renderPlaceholders = (props) => {
const { requiredColonists } = props;
let placeholders = [];

  for (let i = 0; i < requiredColonists; i ++) {
    placeholders.push(
      <div className={`empty__container ${props.class}-${i}`}>
        <div className="empty" />
      </div>
    )
  }
  return placeholders;
}
export default (props) => {
  const isActiveClass = props.canColonize && props.isActivePlayer && props.requiredColonists > 0 ? 'is-active' : '';

  return (
    <div
      className={`monument ${isActiveClass} ${props.class}`}
      onClick={props.onClick}
    >
      <img src={props.imagePath} alt="" className="monument__asset"/>
      <div className="monument__placeholders">
        <div className="monument__placeholders-container">
          {renderPlaceholders(props)}
        </div>
      </div>
      <div>
        {props.pointsIfFirst}
      </div>
      <div>
        {props.pointsIfNotFirst}
      </div>
    </div>
  )
}

import React from 'react';

import './monument-styles.css';

const renderPlaceholders = (num) => {
  let placeholders = [];
  for (let i = 0; i < num; i ++) {
    placeholders.push(
      <div className="empty__container">
        <div className="empty" />
      </div>
    )
  }
  return placeholders;
}
export default (props) => {
  return (
    <div
      className={`monument ${ props.canColonize && props.requiredColonists > 0 ? 'is-active' : ''}`}
      onClick={props.onClick}
    >
      <img src={props.imagePath} alt="" className="monument__asset"/>
      <div className="monument__placeholders">
        <div className="monument__placeholders-container">
          {renderPlaceholders(props.requiredColonists)}
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

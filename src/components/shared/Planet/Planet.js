import React from 'react';

import './planet-styles.css';

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
  const planetStyle = {
    left: `${props.positioning.x}rem`,
    top: `${props.positioning.y}rem`,
  }
  const isActiveClass = props.canColonize && props.isActivePlayer && props.requiredColonists > 0 ? 'is-active' : '';

  return (
    <div
      style={planetStyle}
      className={`planet ${isActiveClass}`}
      onClick={props.onClick}
    >
      <img src={props.planetImage} alt="" className="planet__asset"/>
      <div className="planet__placeholders">
        <div className="planet__placeholders-container">
          {renderPlaceholders(props.requiredColonists)}
        </div>
      </div>
    </div>
  )
}

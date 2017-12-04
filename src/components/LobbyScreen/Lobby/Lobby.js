import React from 'react';

import './lobby-styles.css';

export default (props) => {
  return (
    <div className="lobby">
      <div className="lobby__title">{props.title}</div>
      <div className="lobby__content">
        cello
      </div>
    </div>
  )
}

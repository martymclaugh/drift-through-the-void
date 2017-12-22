import React, { Component } from 'react';
import { connect } from 'react-redux';
import { colonizeMonument } from './monument-actions';
import monumentImagePaths from './monument-image-paths';
import Monument from '../shared/Monument/Monument';

import './monuments-container-styles.css';

class MonumentsContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {}
    this.renderMonuments = this.renderMonuments.bind(this);
  }
  renderMonuments: () => void;
  renderMonuments() {
    return this.props.monuments.map(monument => (
      <Monument
        imagePath={monumentImagePaths[monument.get('id')].imagePath}
        requiredColonists={monument.get('requiredColonists')}
        pointsIfFirst={monument.get('pointsIfFirst')}
        pointsIfNotFirst={monument.get('pointsIfNotFirst')}
      />
    ));
  }
  render() {
    return (
      <div className="monuments-container">
        {this.renderMonuments()}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  monuments: state.monuments,
  colonists: state.playerBoard.get('colonists'),
});

export default connect(mapStateToProps, { colonizeMonument })(MonumentsContainer);

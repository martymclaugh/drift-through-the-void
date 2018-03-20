import React, { Component } from 'react';
import { connect } from 'react-redux';
import { colonizeMonument } from '../GameScreen/game-screen-actions';
import monumentImagePaths from './monument-image-paths';
import Monument from '../shared/Monument/Monument';
import Button from '../shared/Button/Button';

import './monuments-container-styles.css';

class MonumentsContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      finishedColonizing: false,
    }
    this.renderMonuments = this.renderMonuments.bind(this);
  }
  handleMonumentClick: () => void;
  handleMonumentClick(name) {
    const {
      monuments,
      colonists,
      colonizeMonument,
      isActivePlayer
    } = this.props;

    if (monuments.getIn([name, 'requiredColonists']) > 0 && colonists > 0 && isActivePlayer) {
      colonizeMonument({ name });
    }
  }
  finishColonizing: () => void;
  finishColonizing() {
    this.setState({ finishedColonizing: true });

    // setTimeout(() => {
      this.props.changePhase();
    // }, 2000)
  }
  renderMonuments: () => void;
  renderMonuments() {
    const monumentKeys = this.props.monuments.keySeq().toArray()
    return monumentKeys.map(key => {
      const monument = this.props.monuments.get(key);
      return (
        <Monument
          class={key}
          canColonize={this.props.colonists > 0}
          isActivePlayer={this.props.isActivePlayer}
          onClick={() => this.handleMonumentClick(key)}
          imagePath={monumentImagePaths[key].imagePath}
          requiredColonists={monument.get('requiredColonists')}
          pointsIfFirst={monument.get('pointsIfFirst')}
          pointsIfNotFirst={monument.get('pointsIfNotFirst')}
        />
      )
    });
  }
  render() {
    const { isActivePlayer } = this.props;
    const button = isActivePlayer && !this.state.finishedColonizing && (
      <Button onClick={() => this.finishColonizing()}>
        Finish Colonizing
      </Button>
    )
    return (
      <div className="monuments-container">
        {this.renderMonuments()}
        {button}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  monuments: state.gameScreen.getIn(['users', `${state.gameScreen.get('activePlayer')}`, 'monuments']),
  colonists: state.gameScreen.getIn(['users', `${state.gameScreen.get('activePlayer')}`, 'resources', 'colonists']),
  isActivePlayer: state.homeScreen.get('username') === state.gameScreen.get('activePlayer'),
});

export default connect(mapStateToProps, { colonizeMonument })(MonumentsContainer);

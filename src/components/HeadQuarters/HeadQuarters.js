// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import Terminal from '../Terminal/Terminal';
import randomStringArray from '../../helpers/random-string';
import { setHackNumber, setTerminals } from './head-quarters-actions';

import './head-quarters.css';

type Props = {
  numberOfHacks: integer,
  terminals: {
    id: integer,
    value: string,
  },
}

type State = {

}

class HeadQuarters extends Component {
  constructor(props: Props) {
    super(props)

    this.state = {
      hackingActive: false,
      emptyTerminals: 0,
    }

    this.initiateHack = this.initiateHack.bind(this);
    this.handleHacking = this.handleHacking.bind(this);
    this.handleDiscardTerminal = this.handleDiscardTerminal.bind(this);
    this.populateTerminals = this.populateTerminals.bind(this);
    this.terminateHacking = this.terminateHacking.bind(this);
  }

  state: state;

  componentDidMount() {
    this.populateTerminals();
  }
  initiateHack() {
    this.setState({
      hackingActive: true,
    });

    const values = ['credits', 'soylent', 'alien-artifact', 'colonists', 'colonists-soylent', 'alien-and-death'];

    const terminals = this.props.terminals.map(terminal => {
      if (terminal.value) {
        return terminal;
      }
      const value = values[Math.floor(Math.random() * values.length)];
      terminal.value = value;

      return terminal;
    });

    this.setState({
      emptyTerminals: 0,
      hacking: false,
    });

    this.props.setHackNumber({ numberOfHacks: this.props.numberOfHacks - 1 });
    this.props.setTerminals({ terminals });
  }
  handleHacking() {
    if (this.props.numberOfHacks > 0 && this.state.emptyTerminals > 0) {
      this.initiateHack();
    }
  }
  handleDiscardTerminal(terminal) {
    if (this.props.numberOfHacks > 0) {
      const terminals = this.props.terminals.update(this.props.terminals.indexOf(terminal), term => {
          return { id: term.id, value: null};
      });

      this.props.setTerminals({ terminals });
      this.setState({
         emptyTerminals: this.state.emptyTerminals + 1,
      });
    }
  }
  populateTerminals() {
    const terminals = []
    for (var i = 0; i < this.props.terminalAmount; i++) {
      terminals.push({
        id: i + 1,
        value: null,
      });
    }
    this.props.setTerminals({ terminals });
    this.setState({
      emptyTerminals: this.props.terminalAmount,
    });
  }
  terminateHacking() {
    this.setState({ hackingActive: false });
  }
  render() {
    const renderTerminals = this.props.terminals.map((terminal, i) => (
      <Terminal
        key={i}
        numberOfHacks={this.props.numberOfHacks}
        hackingActive={this.state.hackingActive}
        onClick={() => this.handleDiscardTerminal(terminal)}
        algorithm={terminal.value && [...randomStringArray(12 + (i * 5)), terminal.value]}
        {...terminal}
      />
    ));
    console.log('PROPS', this.props);

    return (
      <div>
        <div>Head Quarters</div>
        <div>Number of Hacks: {this.props.numberOfHacks}</div>
        <button onClick={this.handleHacking}>Generate Resources</button>
        <div className="head-quarters__terminals">
          {renderTerminals}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  numberOfHacks: state.headQuarters.get('numberOfHacks'),
  terminals: state.headQuarters.get('terminals'),
});

export default connect(mapStateToProps, { setHackNumber, setTerminals })(HeadQuarters);

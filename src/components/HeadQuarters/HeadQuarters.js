// @flow

import React, { Component } from 'react';
import Terminal from '../shared/Terminal';
import randomStringArray from '../../helpers/random-string';

import './head-quarters.css';

class HQ extends Component {
  constructor(props) {
    super(props)

    this.state = {
      numberOfHacks: 3,
      terminals: [],
      hackingActive: false,
      emptyTerminals: 0,
    }

    this.initiateHack = this.initiateHack.bind(this);
    this.handleHacking = this.handleHacking.bind(this);
    this.handleDiscardTerminal = this.handleDiscardTerminal.bind(this);
    this.populateTerminals = this.populateTerminals.bind(this);
    this.terminateHacking = this.terminateHacking.bind(this);
  }
  componentDidMount() {
    this.populateTerminals();
  }
  initiateHack() {
    this.setState({
      hackingActive: true,
    });

    const values = ['Credits', 'Soylent', 'Alien Artifacts', 'Colonists', 'Colonists/Soylent', 'Alien Artifacts/Plague'];

    const currentTerminals = this.state.terminals.map(terminal => {
      if (terminal.value) {
        return terminal;
      }
      const value = values[Math.floor(Math.random() * values.length)];
      terminal.value = value;

      return terminal;
    });
    this.setState({ emptyTerminals: 0 });

    this.setState({
      terminals: currentTerminals,
      numberOfHacks: this.state.numberOfHacks - 1,
      hacking: false,
    })
  }
  handleHacking() {
    if (this.state.numberOfHacks > 0 && this.state.emptyTerminals > 0) {
      this.initiateHack();
    }
  }
  handleDiscardTerminal(terminal) {
    if (this.state.numberOfHacks > 0) {
      const terminals = this.state.terminals;
      terminals[terminals.indexOf(terminal)].value = null;

      this.setState({
         terminals,
         emptyTerminals: this.state.emptyTerminals + 1,
      });
    }
  }
  populateTerminals() {
    const terminals = []
    for (var i = 0; i < this.props.terminalAmount; i++) {
      terminals.push({
        id: i,
        value: null,
      });
    }

    this.setState({
      terminals,
      emptyTerminals: this.props.terminalAmount,
    });
  }
  terminateHacking() {
    this.setState({ hackingActive: false });
  }
  render() {
    const renderTerminals = this.state.terminals.map((terminal, i) => (
      <Terminal
        numberOfHacks={this.state.numberOfHacks}
        hackingActive={this.state.hackingActive}
        onClick={() => this.handleDiscardTerminal(terminal)}
        algorithm={terminal.value && [...randomStringArray(12 + (i * 5)), terminal.value]}
        {...terminal}
      />
    ));

    return (
      <div>
        <div>Head Quarters</div>
        <div>Number of Hacks: {this.state.numberOfHacks}</div>
        <button onClick={this.handleHacking}>Generate Resources</button>
        <div className="head-quarters__terminals">
          {renderTerminals}
        </div>
      </div>
    )
  }
}

export default HQ;

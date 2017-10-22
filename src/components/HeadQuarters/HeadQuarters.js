// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import Terminal from '../Terminal/Terminal';
import randomStringArray from '../../helpers/random-string';
import { hackingValues } from '../../helpers/hacking-values';
import { setHackNumber, setTerminals } from './head-quarters-actions';

import './head-quarters.css';

type TerminalType = {
  id: number,
  value: string,
}

type State = {
  hackingActive: boolean,
  emptyTerminals: number,
}

type Props = {
  numberOfHacks: number,
  terminalAmount: number,
  terminals: Array<TerminalType>,
  setTerminals: (Object) => void,
  updateStorage: () => void,
  setHackNumber: ({ numberOfHacks: number }) => void,
}


class HeadQuarters extends Component<Props, State>{

  state: State

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
  }

  componentDidMount() {
    this.populateTerminals();
  }

  initiateHack: () => void;
  initiateHack() {
    this.setState({
      hackingActive: true,
    });

    const terminals = this.props.terminals.map(terminal => {
      if (terminal.value) {
        return terminal;
      }
      const value = hackingValues[Math.floor(Math.random() * hackingValues.length)];
      terminal.value = value;

      return terminal;
    });

    this.props.setTerminals({ terminals });
    this.props.setHackNumber({ numberOfHacks: this.props.numberOfHacks - 1 });
  }

  handleHacking: () => void;
  handleHacking() {
    if (this.props.numberOfHacks > 0 && this.state.emptyTerminals > 0) {
      this.initiateHack();
    } else {
      this.props.updateStorage();
    }
  }

  handleDiscardTerminal: (TerminalType) => void;
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

  populateTerminals: () => void;
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

  render() {
    const renderTerminals = this.props.terminals.map((terminal, i) => (
      <Terminal
        key={i}
        numberOfHacks={this.props.numberOfHacks}
        hackingActive={this.state.hackingActive}
        onClick={() => this.handleDiscardTerminal(terminal)}
        algorithm={terminal.value && [...randomStringArray(12 + (i * 5)), terminal.value.name]}
        {...terminal}
      />
    ));

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

// @flow

import React, { Component } from 'react';
import { fromJS } from 'immutable';
import { connect } from 'react-redux';
import { setHackNumber, setTerminals } from './head-quarters-actions';
import randomStringArray from '../../helpers/random-string';
import { hackingValues } from '../../helpers/hacking-values';
import Terminal from '../Terminal/Terminal';
import ControlPanel from '../shared/ControlPanel/ControlPanel';

import './head-quarters.css';

type TerminalType = {
  id: number,
  value: string,
}

type State = {
  hackingActive: boolean,
}

type Props = {
  numberOfHacks: number,
  terminalAmount: number,
  terminals: Array<TerminalType>,
  setTerminals: (Object) => void,
  updateCargo: () => void,
  setHackNumber: ({ numberOfHacks: number }) => void,
}


class HeadQuarters extends Component<Props, State>{

  state: State

  constructor(props: Props) {
    super(props)

    this.state = {
      hackingActive: false,
      emptyTerminalIds: [],
    }

    this.initiateHack = this.initiateHack.bind(this);
    this.handleHacking = this.handleHacking.bind(this);
    this.acceptResources = this.acceptResources.bind(this);
    this.handleDiscardTerminal = this.handleDiscardTerminal.bind(this);
    this.populateTerminals = this.populateTerminals.bind(this);
    this.terminateHacking = this.terminateHacking.bind(this);
  }

  componentDidMount() {
    this.populateTerminals();
  }

  initiateHack: () => void;
  initiateHack() {
    const ms = (Math.max(...this.state.emptyTerminalIds) * 5 + 13) * 50;
    // time it will take last terminal to finish hacking

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

    setTimeout(() => {
      this.setState({ hackingActive: false });
    }, ms)
  }
  handleHacking: () => void;
  handleHacking() {
    if (this.props.numberOfHacks > 0 && this.state.emptyTerminalIds.length > 0) {
      this.initiateHack();
    }
  }
  handleDiscardTerminal: (TerminalType) => void;
  handleDiscardTerminal(terminal) {
    if (this.props.numberOfHacks > 0) {
      const id = terminal.get('id');
      const terminals = this.props.terminals.update(id - 1, term => {
          return fromJS({
            id,
            value: null,
          });
      });

      this.setState({
        emptyTerminalIds: [...this.state.emptyTerminalIds, id],
      });
      this.props.setTerminals({ terminals });
    }
  }
  populateTerminals: () => void;
  populateTerminals() {
    let terminals = [];

    for (var i = 0; i < this.props.terminalAmount; i++) {
      terminals.push({
        id: i + 1,
        value: null,
      });
    }

    this.props.setTerminals({ terminals });
    this.setState({ emptyTerminalIds: terminals.map(t => (t.id - 1)) });
  }
  terminateHacking: () => void;
  terminateHacking() {
    this.setState({ emptyTerminalIds: [] });
    if (this.props.numberOfHacks === 0) {
      // on the last hack
      this.props.updateCargo();
    }
  }
  acceptResources: () => void;
  acceptResources() {
    if (this.state.emptyTerminalIds.length === 0) {
      setTimeout(() => {
        this.props.updateCargo();
      }, 500)
    }
  }
  render() {
    const {
      terminals,
      numberOfHacks,
      terminalAmount,
    } = this.props;
    const {
      emptyTerminalIds,
      hackingActive,
    } = this.state;

    const hackButtonActive = !hackingActive &&
                            numberOfHacks > 0 &&
                            emptyTerminalIds.length > 0;

    const acceptButtonActive = !hackingActive &&
                              numberOfHacks < 3 &&
                              numberOfHacks > 0 &&
                              emptyTerminalIds.length === 0;
                              // TODO add additional check for 'leadership'
                              // once powerups are available

    const renderTerminals = terminals.map((terminal, i) => (
      <Terminal
        key={i}
        numberOfHacks={numberOfHacks}
        hackingActive={hackingActive}
        handleDiscardTerminal={() => this.handleDiscardTerminal(terminal)}
        isLastTerminal={Math.max(...emptyTerminalIds) === terminal.get('id')}
        terminateHacking={this.terminateHacking}
        algorithm={terminal.value && [...randomStringArray(12 + (i * 5)), terminal.value.name]}
        {...terminal}
      />
    ));

    return (
      <div>
        <div>Head Quarters</div>
        <div>Number of Hacks: {numberOfHacks}</div>
        <ControlPanel
          handleHack={this.handleHacking}
          handleAccept={this.acceptResources}
          hackButtonActive={hackButtonActive}
          acceptButtonActive={acceptButtonActive}
        />
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

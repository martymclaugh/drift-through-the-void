// @flow

import React, { Component } from 'react';
import terminal from '../../assets/images/terminal-images/terminal.png'
import randomStringArray from '../../helpers/random-string';
import imagePaths from './image-paths';

import './terminal-styles.css';

type Props = {
  numberOfHacks: number,
  hackingActive: boolean,
  onClick: () => void,
  algorithm: Array<string> | string,
}

type State = {
  value: ?string,
}

class Terminal extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      value: null
    }

    this.generateHackIllusion = this.generateHackIllusion.bind(this);
    this.handleDiscardTerminal = this.handleDiscardTerminal.bind(this);
  }

  state: State;

  componentWillReceiveProps(nextProps: Props) {
    this.state.value === null &&
    nextProps.algorithm &&
    this.generateHackIllusion(nextProps.algorithm);

    if (nextProps.isLastTerminal && nextProps.algorithm && !this.props.hackingActive) {
      // we only want to trigger terminate hacking once the
      // terminal has fully gone through the 'hack illusion'
      // adding 300 ms so it's not immediately after.
      setTimeout(() => {
        this.props.terminateHacking();
      }, 50 * (nextProps.algorithm.length + 1) + 300);
    }
  }

  generateHackIllusion: (Array<string> | string) => void;
  generateHackIllusion(arr) {

    arr.map((sym, i) => {
      setTimeout(() => {
        this.setState({ value: sym });
      }, 50 * (i + 1));
    });
  }

  handleDiscardTerminal: () => void;
  handleDiscardTerminal() {
    if (this.props.numberOfHacks > 0) {
      this.setState({ value: null });
      this.props.handleDiscardTerminal();
    } else {
      alert("you're stuck with these");
    }
  }
  render() {
    const { value } = this.state;
    const {
      hackingActive,
      numberOfHacks,
    } = this.props;

    const display = imagePaths[value] ?
    <img className="terminal__asset-image" src={imagePaths[value].path} alt=""/> :
    value;
    const isActive = !!value;

    return (
      <div
        onClick={value && !hackingActive && numberOfHacks > 0 ? this.handleDiscardTerminal : null}
        // check if value has already been removed
        // and if hacking isn't active
        // and if more hacking is allowed
        className={`terminal ${isActive ? 'is-active' : ''}`}
      >
        <img style={{width: 'inherit'}} src={terminal} alt="" className="terminal__asset"/>
        <div className="terminal__content">{display}</div>
        <div className={`${isActive ? 'power-light' : ''}`} />
      </div>
    )
  }
}

export default Terminal;

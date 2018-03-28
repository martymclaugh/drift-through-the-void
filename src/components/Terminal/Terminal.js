// @flow

import React, { Component } from 'react';
import terminal from '../../assets/images/terminal-images/terminal.png'
import imagePaths from './image-paths';
import { Props, State } from '../../flow/shared/terminal-type';

import './terminal-styles.css';

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
    const {
      algorithm,
      isLastTerminal,
    } = nextProps;

    this.state.value === null &&
                         algorithm &&
                         this.generateHackIllusion(algorithm);
    if (!nextProps.value) {
      // set value to null for player watching
      this.setState({
        value: null,
      });

    }

    if (isLastTerminal && algorithm && !this.props.hackingActive) {
      // we only want to trigger terminate hacking once the
      // terminal has fully gone through the 'hack illusion'
      // adding 300 ms so it's not immediately after.
      setTimeout(() => {
        this.props.terminateHacking();
      }, 50 * (algorithm.length + 1) + 300);
    }
  }

  generateHackIllusion: (arr: any) => void;
  generateHackIllusion(arr: any) {

    arr.map((sym, i) => { // eslint-disable-line array-callback-return
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
    }
  }
  render() {
    const { value } = this.state;
    const {
      hackingActive,
      numberOfHacks,
      canHack,
    } = this.props;

    const display = imagePaths[value] ?
    <img className="terminal__asset-image" src={imagePaths[value].path} alt=""/> :
    value;
    const isActive = !!value;

    return (
      <div
        onClick={canHack && value && !hackingActive && numberOfHacks > 0 ? this.handleDiscardTerminal : null}
        // check if value has already been removed
        // and if hacking isn't active
        // and if more hacking is allowed
        className={`terminal ${isActive && canHack ? 'is-active' : ''}`}
      >
        <img style={{ width: 'inherit' }} src={terminal} alt="terminal" className="terminal__asset"/>
        <div className="terminal__content">{display}</div>
        <div className={`${isActive ? 'power-light' : ''}`} />
      </div>
    )
  }
}

export default Terminal;

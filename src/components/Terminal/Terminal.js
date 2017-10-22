// @flow

import React, { Component } from 'react';
import terminal from '../assets/images/terminal.png'
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
  }

  generateHackIllusion: (Array<string> | string) => void;
  generateHackIllusion(arr) {

    arr.map((sym, i) => {

      setTimeout(() => {
        this.setState({ value: sym });
      }, 50 * i + 1);
    })
  }

  handleDiscardTerminal: () => void;
  handleDiscardTerminal() {
    if (this.props.numberOfHacks > 0) {
      this.setState({ value: null });
      this.props.onClick();
    } else {
      alert("you're stuck with these")
    }
  }
  render() {
    const display = imagePaths[this.state.value] ?
    <img className="terminal__asset-image" src={imagePaths[this.state.value].path} alt=""/> :
    this.state.value;
    const isActive = !!this.state.value;

    return (
      <div onClick={this.handleDiscardTerminal} className={`terminal ${isActive ? 'is-active' : ''}`}>
        <img style={{width: 'inherit'}} src={terminal} alt="" className="terminal__asset"/>
        <div className="terminal__content">{display}</div>
        <div className={`${isActive ? 'power-light' : ''}`} />
      </div>
    )
  }
}

export default Terminal;

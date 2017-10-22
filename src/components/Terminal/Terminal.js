import React, { Component } from 'react';
import terminal from '../assets/images/terminal.png'
import randomStringArray from '../../helpers/random-string';
import imagePaths from './image-paths';

import './terminal-styles.css';

class Terminal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: null
    }

    this.generateHackIllusion = this.generateHackIllusion.bind(this);
    this.handleDiscardTerminal = this.handleDiscardTerminal.bind(this);
  }
  generateHackIllusion(arr) {

    arr.map((sym, i) => {

      setTimeout(() => {
        this.setState({ value: sym });
      }, 50 * i + 1);
    })
  }
  handleDiscardTerminal() {
    if (this.props.numberOfHacks > 0) {
      this.setState({ value: null });
      this.props.onClick();
    } else {
      alert("you're stuck with these")
    }
  }
  componentWillReceiveProps(nextProps) {
    this.state.value === null &&
    nextProps.algorithm &&
    this.generateHackIllusion(nextProps.algorithm);
  }
  render() {
    const display = imagePaths[this.state.value] ?
    <img className="terminal__asset-image" src={imagePaths[this.state.value].path} alt=""/> :
    this.state.value;
    const isActive = !!this.state.value;
    console.log('HERE', this.props);

    return (
      <div key={this.props.key} onClick={this.handleDiscardTerminal} className={`terminal ${isActive ? 'is-active' : ''}`}>
        <img style={{width: 'inherit'}} src={terminal} alt="" className="terminal__asset"/>
        <div className="terminal__content">{display}</div>
        <div className={`${isActive ? 'power-light' : ''}`} />
      </div>
    )
  }
}

export default Terminal;

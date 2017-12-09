// @flow

import React, { Component } from 'react';
import colonistGreen from '../../assets/images/resource-images/colonist-green.png';
import colonistBlack from '../../assets/images/resource-images/colonist-black.png'
import { Props, State } from '../../flow/components/colonist-icon-types';

import './colonist-icon-styles.css';

class ColonistIcon extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      amount: 0,
    }

    this.powerUpColonists = this.powerUpColonists.bind(this);
  }
  componentDidMount() {
    this.powerUpColonists(this.props.colonists);
  }
  componentWillReceiveProps(nextProps: Props) {
    this.powerUpColonists(nextProps.colonists);
  }
  powerUpColonists: (num: number) => void;
  powerUpColonists(num: number) {
    for (let i = 1; i < num + 1; i ++) {
      setTimeout(() => {
        return this.setState({ amount: i });
      }, 100 * (i))
    }
  }
  render() {
    const isActive = this.props.colonists > 0;
    const style = {
      opacity: this.state.amount / 15 * 2
    }

    return (
      <div className="colonist-icon">
        <img
          src={isActive ? colonistGreen : colonistBlack}
          style={isActive ? style : {}}
          alt="colonist-icon"
          className="colonist-icon__asset"
        />
        <div className="colonist-icon__amount">{this.state.amount}</div>
      </div>
    )
  }
}

export default ColonistIcon;

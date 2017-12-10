// @flow

import React, { Component } from 'react';
import Button from '../Button/Button';
import { Props, State } from '../../../flow/shared/dropdown-menu-types';
import './dropdown-menu-styles.css';

class DropDownMenu extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      isActive: false,
      value: 2,
    }

    this.toggleMenu = this.toggleMenu.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.renderDropdownItems = this.renderDropdownItems.bind(this);
  }
  toggleMenu: () => void;
  toggleMenu() {
    this.setState({
      isActive: !this.state.isActive,
    });
  }
  handleClick: (value: any) => void;
  handleClick(value: any) {
    this.props.handleDropdownSelection(value);
    this.setState({
      isActive: false,
      value,
    });
  }
  renderDropdownItems: () => void;
  renderDropdownItems() {
    return this.props.items.map(item => (
      <div
        className="dropdown-menu__item"
        onClick={() => this.handleClick(item.value)}
      >
        {item.name}
      </div>
    ));
  }
  render() {
    return (
      <div class="dropdown-menu">
        <Button
          onClick={() => this.toggleMenu()}
          isActive={this.state.isActive}
        >{this.state.value} &#9660;</Button>
        <div className={`dropdown-menu__content ${this.state.isActive ? 'is-active' : ''}`}>
          {this.renderDropdownItems()}
        </div>
      </div>
    )
  }
}

export default DropDownMenu;

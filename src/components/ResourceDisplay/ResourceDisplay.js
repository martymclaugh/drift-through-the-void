import React, { Component } from 'react';
import { connect } from 'react-redux';

class ResourceDisplay extends Component {
  constructor(props) {
    super(props);

    this.state = {}
  }

  render() {
    console.log(this.props.storage);
    return (
      <div>ResourceDisplay</div>
    )
  }
}

const mapStateToProps = state => ({
  storage: state.playerBoard
});

export default connect(mapStateToProps, {  })(ResourceDisplay);

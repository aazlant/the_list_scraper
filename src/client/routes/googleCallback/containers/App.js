import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../../modules/actions';

class App extends Component {

  render() {
      return (
        <h1>Hello World!</h1>
      );
  }
}

const mapStateToProps = state => state;
export default connect(mapStateToProps)(App);

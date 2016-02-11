import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../../modules/actions';

class GoogleCallback extends Component {

  render() {
      return (
        <h1>Successfully returned from Google.</h1>
      );
  }
}

const mapStateToProps = state => state;
export default connect(mapStateToProps)(GoogleCallback);

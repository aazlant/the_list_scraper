import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../../modules/actions';
import { parse } from 'qs';

class GoogleCallback extends Component {

  render() {
      const { location } = this.props;
      const parsedQueries = parse(location.hash.substring(1));
      // #TODO validate state/nonce
      // #TODO action to validate user

      return (
        <h1>Successfully returned from Google. Redirecting...</h1>
      );
  }
}

const mapStateToProps = state => state;
export default connect(mapStateToProps)(GoogleCallback);

import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../../modules/actions';
import PropTypes from 'prop-types';
import { parse } from 'qs';

class GoogleCallback extends Component {

  componentDidMount() {
      // #TODO validate state/nonce
      // #TODO action to validate user
  }

  render() {
      const { location } = this.props;
      const parsedQueries = parse(location.hash.substring(1));

      return (
        <h1>Successfully returned from Google. Redirecting...</h1>
      );
  }
}

const mapStateToProps = state => state;
export default connect(mapStateToProps)(GoogleCallback);

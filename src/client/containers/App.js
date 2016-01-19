// #TODO: refactor with immutablejs

import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../actions';
import ShowsPanel from '../components/ShowsPanel';

import ImmutablePropTypes from 'react-immutable-proptypes';
import { Filter } from '../models/filters/records';
import { Show } from '../models/shows/records';

class App extends Component {

  render() {
      const { shows, filter, dispatch } = this.props;
      const boundActions = bindActionCreators(actions, dispatch);
      return (
        <ShowsPanel shows={shows} filter={filter} actions={boundActions}/>
      );
  }
}

App.propTypes = {
    shows: ImmutablePropTypes.recordOf(Show).isRequired,
    filter: ImmutablePropTypes.recordOf(Filter).isRequired,
    dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = state => state;
export default connect(mapStateToProps)(App);

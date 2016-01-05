// #TODO: refactor with immutablejs

import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../actions';
import ShowsPanel from '../components/ShowsPanel';

class App extends Component {

  render() {
      const { shows, dispatch } = this.props;
      const boundActions = bindActionCreators(actions, dispatch);
      return (
        <ShowsPanel shows={shows} actions={boundActions}/>
      );
  }
}

App.propTypes = {
    shows: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = state => state;
export default connect(mapStateToProps)(App);

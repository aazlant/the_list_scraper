import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../../modules/actions';

import ShowsPanel from './ShowsPanel';
import Calendar from '../components/Calendar';

import ImmutablePropTypes from 'react-immutable-proptypes';
import { Filter } from '../../../modules/shows/records/filters';
import { Show } from '../../../modules/shows/records/shows';

import styles from './App.styl';

class App extends Component {

  render() {
      const { shows, filter, dispatch } = this.props;
      const boundActions = bindActionCreators(actions, dispatch);
      return (
        <div className={styles.appRoot}>
          <div className={styles.calendar}>
            <Calendar />
          </div>
          <div className={styles.showsPanel}>
            <ShowsPanel shows={shows} filter={filter} actions={boundActions}/>
          </div>
        </div>
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

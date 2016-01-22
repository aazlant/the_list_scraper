import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../../modules/actions';

import ShowsPanel from './ShowsPanel';
import CalendarPanel from './CalendarPanel';

import ImmutablePropTypes from 'react-immutable-proptypes';
import { Calendar } from '../../../modules/calendars/records/calendars';
import { Filter } from '../../../modules/shows/records/filters';
import { Show } from '../../../modules/shows/records/shows';

import styles from './App.styl';

class App extends Component {

  render() {
      const { shows, filter, calendars, dispatch } = this.props;
      const boundActions = bindActionCreators(actions, dispatch);
      return (
        <div className={styles.appRoot}>
          <div className={styles.calendarPanel}>
            <CalendarPanel events={calendars.events}/>
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
    calendars: ImmutablePropTypes.recordOf(Calendar).isRequired,
    dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = state => state;
export default connect(mapStateToProps)(App);

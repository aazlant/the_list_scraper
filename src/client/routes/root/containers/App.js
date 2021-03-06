import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../../modules/actions';

import Geolocation from 'react-geolocation';

import ShowsPanel from './ShowsPanel';
import CalendarPanel from './CalendarPanel';
import Header from '../components/Header';
import LoginModal from '../components/LoginModal';
import EventModal from '../components/EventModal';

import ImmutablePropTypes from 'react-immutable-proptypes';
import { Application } from '../../../modules/application/records/application';
import { Calendar } from '../../../modules/calendars/records/calendars';
import { Filter } from '../../../modules/shows/records/filters';
import { Show } from '../../../modules/shows/records/shows';

import styles from './App.styl';
import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome-webpack';

function App(props) {
    const { application, shows, filter, calendars, dispatch } = props;
    const boundActions = bindActionCreators(actions, dispatch);
    return (
      <div className={styles.appRoot}>

        <div className={styles.header}>
          <Header application={application} actions={boundActions}/>
        </div>

        <LoginModal
              application={application}
              actions={boundActions}
        />
        <EventModal
                application={application}
                actions={boundActions}
        />

        <div className={styles.calendarPanel}>
          <CalendarPanel events={calendars.events}/>
        </div>

      </div>
    );
}

App.propTypes = {
    application: ImmutablePropTypes.recordOf(Application).isRequired,
    shows: ImmutablePropTypes.recordOf(Show).isRequired,
    filter: ImmutablePropTypes.recordOf(Filter).isRequired,
    calendars: ImmutablePropTypes.recordOf(Calendar).isRequired,
    dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = state => state;
export default connect(mapStateToProps)(App);

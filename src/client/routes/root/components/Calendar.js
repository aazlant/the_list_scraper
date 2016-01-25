import React, { Component, PropTypes } from 'react';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';

import 'react-big-calendar/lib/css/react-big-calendar.css';
import styles from './Calendar.styl';

BigCalendar.setLocalizer(
  BigCalendar.momentLocalizer(moment)
);

export default class Calendar extends Component {

  render() {
    const { events, actions, ...preferences } = this.props;
      return (
        <BigCalendar
            className={styles.calendar}
            selectable={preferences.selectable}
            defaultDate={new Date()}
            events={events}
            views={preferences.views}
            onSelectSlot={preferences.onSelectSlot}
        />
      );
  }
}

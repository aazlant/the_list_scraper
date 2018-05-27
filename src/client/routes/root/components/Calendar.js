import PropTypes from 'prop-types';
import React, { Component } from 'react';
import BigCalendar from 'react-big-calendar';
import CustomEventComponent from './CustomEventComponent';
import moment from 'moment';

import 'react-big-calendar/lib/css/react-big-calendar.css';
import styles from './Calendar.styl';

BigCalendar.setLocalizer(
  BigCalendar.momentLocalizer(moment)
);

const customComponent = {
    month: {
        event: CustomEventComponent,
    },
};

export default function Calendar(props) {
  const { events, actions, ...preferences } = props;
    return (
      <BigCalendar
          className={styles.calendar}
          selectable={preferences.selectable}
          defaultDate={new Date()}
          events={events}
          views={preferences.views}
          onSelectSlot={preferences.onSelectSlot}
          components={customComponent}
      />
    );
}

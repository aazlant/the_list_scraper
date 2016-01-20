import React, { Component, PropTypes } from 'react';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';

import 'react-big-calendar/lib/css/react-big-calendar.css';

// import events from '../events';

const events = [
    {
        'title': 'Sample Show',
        'allDay': true,
        'start': new Date(2016, 0, 1),
        'end': new Date(2016, 0, 1),
    },
];

BigCalendar.setLocalizer(
  BigCalendar.momentLocalizer(moment)
);

export default class Calendar extends Component {
  render() {
      return (
        <BigCalendar
            selectable
            defaultDate={new Date()}
            events={events}
            views={['month', 'agenda']}
            onSelectSlot={(slotInfo) => alert(
                `selected slot: \n\nstart ${slotInfo.start.toLocaleString()} ` +
                `\nend: ${slotInfo.end.toLocaleString()}`
            )}
        />
      );
  }
}

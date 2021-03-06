import PropTypes from 'prop-types';
import React, { Component } from 'react';
import CalendarComponent from '../components/Calendar';

import ImmutablePropTypes from 'react-immutable-proptypes';
import { Calendar, Event } from '../../../modules/calendars/records/calendars';

import styles from './CalendarPanel.styl';

export default function CalendarPanel(props) {
    const { events } = props;
    const calendarEvents = events.toArray();

    return (
        <CalendarComponent
            views={['month', 'agenda']}
            selectable
            events={calendarEvents}
            onSelectSlot={(slotInfo) => alert(
              `selected slot: \n\nstart ${slotInfo.start.toLocaleString()} ` +
              `\nend: ${slotInfo.end.toLocaleString()}`
            )}
        />
    );
}

CalendarPanel.propTypes = {
    events: ImmutablePropTypes.setOf(Event).isRequired,
};

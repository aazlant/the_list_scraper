import PropTypes from 'prop-types';
import React, { Component } from 'react';
import styles from './CustomEventComponent.styl';


export default function CustomEventComponent(props) {
    const { event, title } = props;
    const {removeEventFromCurrentCalendar, toggleEventModal} = event.boundActions;
    return (
      <div className={styles.root}>
        <span
          className={styles.delete}
          onClick={()=>{removeEventFromCurrentCalendar(event);}}
        >×</span>
        <span
          className={styles.title}
          onClick={()=>{toggleEventModal(event);}}
        >{title}</span>
      </div>
    );
}

CustomEventComponent.propTypes = {
    event: PropTypes.object.isRequired,
    title: PropTypes.string.isRequired,
};

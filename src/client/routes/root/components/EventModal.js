import PropTypes from 'prop-types';
import React, { Component } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { Application } from '../../../modules/application/records/application';
import { Event } from '../../../modules/calendars/records/calendars';

import { Modal, Button } from 'react-bootstrap';
import styles from './EventModal.styl';

import moment from 'moment';

export default function EventModal(props) {
    const { actions: { toggleEventModal }, application: {eventModal} } = props;
    const modalState = eventModal.open;
    const event = eventModal.event.toJS();
    const show = event.show || {bands: []}; // Question: UGLY
    return (
          <Modal
            className={styles.modal}
            show={modalState}
            onHide={toggleEventModal}
          >
            <Modal.Header>
              <div className={styles.header}>{event.title} - {moment(event.start).format('MMMM Do, YYYY')}</div>
            </Modal.Header>

            <Modal.Body>
              <div className={styles.bands}>
                {show.bands.map((band, i)=>
                  <div className={styles.band} key={i}>{band}</div>
                )}
              </div>
              <div className={styles.time}>{show.time}</div>
              <div className={styles.price}>{show.price}</div>
            </Modal.Body>

          </Modal>
    );
}

EventModal.propTypes = {
    actions: PropTypes.object.isRequired,
    application: ImmutablePropTypes.recordOf(Application).isRequired,
};

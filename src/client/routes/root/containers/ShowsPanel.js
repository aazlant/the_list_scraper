import PropTypes from 'prop-types';
import React, { Component } from 'react';
import ShowsList from './ShowsList';
import ShowsFilter from './ShowsFilter';

import ImmutablePropTypes from 'react-immutable-proptypes';
import { Filter } from '../../../modules/shows/records/filters';
import { Show } from '../../../modules/shows/records/shows';

import styles from './ShowsPanel.styl';

export default function ShowsPanel(props) {
    const {
      shows,
      filter,
      actions: {
        setVenueFilter,
        setBandFilter,
        addEventToCurrentCalendar,
        removeEventFromCurrentCalendar,
        toggleEventModal,
      },
    } = props;
    const items = shows.get('items');
    const isFetching = shows.get('isFetching');
    return (
      <div className={styles.root}>
        <ShowsFilter items={items} filter={filter} actions={{setVenueFilter, setBandFilter}}/>
        {isFetching && items.size === 0 &&
          <h4>Loading Shows...</h4>
        }
        {!isFetching && items.size === 0 &&
          <h2>Empty.</h2>
        }
        {items.size > 0 &&
          <div>
            <ShowsList items={items} filter={filter} actions={{
                addEventToCurrentCalendar,
                removeEventFromCurrentCalendar,
                toggleEventModal,
            }}/>
          </div>
        }
      </div>
    );
}

ShowsPanel.propTypes = {
    shows: ImmutablePropTypes.recordOf(Show).isRequired,
    filter: ImmutablePropTypes.recordOf(Filter).isRequired,
    actions: PropTypes.object.isRequired,
};

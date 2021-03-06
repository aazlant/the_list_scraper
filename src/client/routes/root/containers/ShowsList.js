import React, { Component } from 'react';

import ImmutablePropTypes from 'react-immutable-proptypes';
import { Filter } from '../../../modules/shows/records/filters';
import { Item } from '../../../modules/shows/records/shows';

import ShowItem from '../components/ShowItem';

import moment from 'moment';

import styles from './ShowsList.styl';
require('font-awesome-webpack');

const buildShowItemsByDate = (items, venuesFilter, bandsFilter)=> {
    // receives:
    //      a list of Items (/src/client/modules/shows/records/shows.js)
    //      a list of strings (venuesFilter) to filter the items' venues against.
    //      a list of strings (bandsFilter) to filter the items' bands lists against.
    //
    // returns: a hash that maps
    //      `dates` (as keys) to a list of all shows for that given date
    //
    // notes: function returns ANY show that has a selected venue if filter exists
    //        or ANY show that has a selected band if filter exists,
    //        but ONLY those shows where a set of bands are playing a given set of venues
    //        if both are selected

    const containsAny = (source, target)=> {
        const result = source.filter((item)=> { return target.includes(item);});
        return (result.size > 0);
    };

    const showsByDate = {};
    for (const i in items) {
        if (items.hasOwnProperty(i)) {
            const {date, ...show} = items[i].toObject(); // #QUESTION: Getters and setters?

            if (date in showsByDate
                  && (venuesFilter.includes(show.venue) || venuesFilter.size === 0)
                  && (containsAny(bandsFilter, show.bands) || bandsFilter.size === 0)
                ) {
                showsByDate[date].push(show);
            } else if (
              (venuesFilter.includes(show.venue) || venuesFilter.size === 0)
                  && (containsAny(bandsFilter, show.bands) || bandsFilter.size === 0)
              ) {
                showsByDate[date] = [show];
            }
        }
    }
    return showsByDate;
};

export default function ShowsList(props) {
    const {filter, actions} = props;

    const items = props.items.toArray();

    const venuesFilter = filter.get('venues');
    const bandsFilter = filter.get('bands');
    const showsByDate = buildShowItemsByDate(items, venuesFilter, bandsFilter);

    return (
      <div className={styles.root}>
        {Object.keys(showsByDate).map((date)=>{
            const shows = showsByDate[date];
            return (
              <div key={date}>

              <div className={styles.date}><b>{moment(date).format('MMMM Do, YYYY')}</b></div>

              <div className={styles.shows}>
                {shows.map((show)=>
                      <ShowItem key={show.id} show={show} date={date} actions={actions}/>
                )}
              </div>

            </div>);
        })}
      </div>
    );
}

ShowsList.propTypes = {
    items: ImmutablePropTypes.listOf(ImmutablePropTypes.recordOf(Item)).isRequired,
    filter: ImmutablePropTypes.recordOf(Filter),
};

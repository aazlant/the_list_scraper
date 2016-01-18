import React, { Component } from 'react';

import ImmutablePropTypes from 'react-immutable-proptypes';
import { Filter } from '../models/filters/records';
import { Item } from '../models/shows/records';

import ShowItem from './ShowItem';

import moment from 'moment';

import styles from './ShowsList.styl';
require('font-awesome-webpack');

const buildShowItemsByDate = (items, venuesFilter, bandsFilter)=> {
    // receives:
    //      a list of Items (/src/client/models/shows/records.js)
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
            const item = items[i].toObject();
            const {date, ...show} = item;

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

export default class ShowsList extends Component {
  render() {
      const {filter} = this.props;
      const items = this.props.items.toArray();

      const venuesFilter = filter.get('venues');
      const bandsFilter = filter.get('bands');
      const showsByDate = buildShowItemsByDate(items, venuesFilter, bandsFilter);

      return (
        <div className={styles.root}>
          {Object.keys(showsByDate).map((date)=>{
              const shows = showsByDate[date];
              return (
                <div key={date}>

                <span className="date"><b>{moment(date).format('MMMM Do, YYYY')}</b></span>

                <div className="shows">
                  {shows.map((show)=>
                        <ShowItem key={show.id} show={show}/>
                  )}
                </div>

              </div>);
          })}
        </div>
      );
  }
}

ShowsList.propTypes = {
    items: ImmutablePropTypes.listOf(ImmutablePropTypes.recordOf(Item)).isRequired,
    filter: ImmutablePropTypes.recordOf(Filter),
};

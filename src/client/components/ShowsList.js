import React, { PropTypes, Component } from 'react';
import ShowItem from './ShowItem';
import moment from 'moment';

const buildShowItemsByDate = (items, venuesFilter)=> {
    const showsByDate = {};
    for (const item in items) {
        if (items.hasOwnProperty(item)) {
            const {date, ...show} = items[item];

            if (date in showsByDate && (venuesFilter.indexOf(show.venue) > -1 || venuesFilter.length === 0)) {
                showsByDate[date].push(show);
            } else if (venuesFilter.indexOf(show.venue) > -1 || venuesFilter.length === 0) {
                showsByDate[date] = [show];
            }
        }
    }
    return showsByDate;
};

import styles from './ShowsList.styl';
require('font-awesome-webpack');

export default class ShowsList extends Component {
  render() {
      const {venues} = this.props.filter;
      const showsByDate = buildShowItemsByDate(this.props.items, venues);

      return (
        <div className={styles.root}>
          {Object.keys(showsByDate).map((date)=>{
              const shows = showsByDate[date];
              return (<div key={date}>
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
    items: PropTypes.array.isRequired,
    filter: PropTypes.object.isRequired,
};

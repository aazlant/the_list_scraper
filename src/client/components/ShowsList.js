import React, { PropTypes, Component } from 'react';
import ShowItem from './ShowItem';
import moment from 'moment';

const buildShowItemsByDate = (items)=> {
    const showsByDate = {};
    for (const item in items) {
        if (items.hasOwnProperty(item)) {
            const {date, ...shows} = items[item];
            if (date in showsByDate) {
                showsByDate[date].push(shows);
            } else {
                showsByDate[date] = [shows];
            }
        }
    }
    return showsByDate;
};

import styles from './ShowsList.styl';
require('font-awesome-webpack');

export default class ShowsList extends Component {
  render() {
      const showsByDate = buildShowItemsByDate(this.props.items);

      return (
        <div className="root" style={styles.root}>
          {Object.keys(showsByDate).map((date)=>{
              const shows = showsByDate[date];
              return (<div key={date}>
                <span className="date"><b>{moment(date).format('MMMM Do, YYYY')}</b></span>
                <div className="shows">
                  {shows.map((show)=>
                    <ShowItem show={show}/>
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
};

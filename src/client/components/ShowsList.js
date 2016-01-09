import React, { PropTypes, Component } from 'react';
import ShowItem from './ShowItem';
import moment from 'moment';

const buildShowItemsByDate = (items)=> {
    const showsByDate = {};

    for (const item in items) {
        if (items.hasOwnProperty(item)) {
            const { date } = items[item];
            const showContent = Object.assign({}, items[item]);
            delete showContent.date;

            if (date in showsByDate) {
                showsByDate[date].push(showContent);
            } else {
                showsByDate[date] = [showContent];
            }
        }
    }

    return showsByDate;
};

const globalStyle = {fontSize: '12px', marginLeft: '2em', fontFamily: 'verdana'};
const dateStyle = {fontSize: '14px'};
const showsStyle = {marginBottom: '1em'};
require('font-awesome-webpack');

export default class ShowsList extends Component {
  render() {
      const showsByDate = buildShowItemsByDate(this.props.items);

      return (
        <div style={globalStyle}>
          {Object.keys(showsByDate).map((date)=>{
              // TODO: move to subcomponent
              const shows = showsByDate[date];
              return (<div key={date}>
                <span className="date" style={dateStyle}><b>{moment(date).format('MMMM Do, YYYY')}</b></span>
                <div className="shows" style={showsStyle}>
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

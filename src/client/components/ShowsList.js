import React, { PropTypes, Component } from 'react';
import moment from 'moment';

const buildShowItemsByDate = (items)=> {
    const showsByDate = {};

    for (const item in items) {
        if (items.hasOwnProperty(item)) {
            const { id, date, bands, venue, time, soldOut, pit, multiDay, ages, price } = items[item];
            const showContent = {
                id,
                bands,
                venue,
                time,
                soldOut,
                pit,
                multiDay,
                ages,
                price,
            };

            if (date in showsByDate) {
                showsByDate[date].push(showContent);
            } else {
                showsByDate[date] = [showContent];
            }
        }
    }

    const shows = [];

    for (const item in showsByDate) {
        if (showsByDate.hasOwnProperty(item)) {
            const show = {
                date: item,
                shows: showsByDate[item],
            };

            shows.push(show);
        }
    }

    return shows;
};

const globalStyle = {fontSize: '12px', marginLeft: '2em', fontFamily: 'verdana'};
const dateStyle = {fontSize: '14px'};
const showsStyle = {marginBottom: '1em'};
const showStyle = {marginLeft: '1em', marginTop: '1em', marginBottom: '1em'};
const showItemStyle = {marginRight: '2em', marginTop: '.5em'};
const bandStyle = {marginLeft: '4em', fontStyle: 'italic'};

export default class ShowsList extends Component {
  render() {
      const items = buildShowItemsByDate(this.props.items);

      return (
        <div style={globalStyle}>
          {items.map((item)=>{
              // #TODO: move below to subcomponents
              return (<div key={item.id}>
                <span className="date" style={dateStyle}><b>{moment(item.date).format('MMMM Do, YYYY')}</b></span>
                <div className="shows" style={showsStyle}>
                  {item.shows.map((show)=>
                      <div key={show.id}>
                        <div className="show" style={showStyle}>
                          <span className="venue" style={showItemStyle}><b>{show.venue}</b></span>
                          <span className="time" style={showItemStyle}>{show.time}</span>
                          <span className="price" style={showItemStyle}>{show.price}</span>
                        </div>
                        <div className="bands">
                          {show.bands.map((band, i)=>
                            <div className="band" style={bandStyle} key={i}>{band}</div>
                          )}
                        </div>
                      </div>

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

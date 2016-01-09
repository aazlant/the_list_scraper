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

const showsStyle = {marginBottom: '1em'};
const showStyle = {marginLeft: '1em', marginTop: '1em', marginBottom: '1em'};
const showItem = {marginRight: '2em', marginTop: '.5em'};
const bandStyle = {marginLeft: '4em', fontStyle: 'italic'};

export default class ShowsList extends Component {
  render() {
      const items = buildShowItemsByDate(this.props.items);

      return (
        <ul>
          {items.map((item)=>{
              // #TODO: move below to subcomponents
              return (<li>
                <b>{moment(item.date).format('MMMM Do, YYYY')}</b>
                <div className="shows" style={showsStyle}>
                  {item.shows.map((show)=>
                      <div key={show.id}>
                        <div className="show" style={showStyle}>
                          <span className="venue" style={showItem}>{show.venue}</span>
                          <span className="time" style={showItem}>{show.time}</span>
                          <span className="price" style={showItem}>{show.price}</span>
                        </div>
                        <div className="bands">
                          {show.bands.map((band, i)=>
                            <div className="band" style={bandStyle} key={i}>{band}</div>
                          )}
                        </div>
                      </div>

                  )}
                </div>
              </li>);
          })}
        </ul>
      );
  }
}

ShowsList.propTypes = {
    items: PropTypes.array.isRequired,
};

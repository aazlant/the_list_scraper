import React, { PropTypes, Component } from 'react';
import moment from 'moment';

export default class ShowsList extends Component {
  render() {
      return (
        <ul>
          {this.props.items.map((item) =>
            <li key={item.id}>
              <p>{moment(item.date).format('MMMM Do, YYYY')}</p>
              <p>{item.venue}</p>
              {item.bands.map((band, i)=>
                <div key={i}><b>{band}</b></div>
              )}
            </li>
          )}
        </ul>
      );
  }
}

ShowsList.propTypes = {
    items: PropTypes.array.isRequired,
};

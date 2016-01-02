import React, { PropTypes, Component } from 'react'
import moment from 'moment';

export default class Shows extends Component {
  render() {
    return (
      <ul>
        {this.props.items.map((item) =>
          <li>
            <p>{moment(item.date).format('MMMM Do, YYYY')}</p>
            <p>{item.venue}</p>
            {item.bands.map((band)=>
              <div><b>{band}</b></div>
            )}
          </li>
        )}
      </ul>
    )
  }
}

Shows.propTypes = {
  items: PropTypes.array.isRequired
}

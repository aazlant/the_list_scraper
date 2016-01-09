import React, { PropTypes, Component } from 'react';
import BandItem from './BandItem';

const showStyle = {marginLeft: '1em', marginTop: '1em', marginBottom: '1em'};
const showHeaderItemStyle = {marginRight: '2em', marginTop: '.5em'};
require('font-awesome-webpack');

export default class ShowsList extends Component {
  render() {
      const { show } = this.props;

      return (
        <div key={show.id}>
          <div className="show" style={showStyle}>
            <span className="venue" style={showHeaderItemStyle}><b>{show.venue}</b></span>
            <span className="time" style={showHeaderItemStyle}>{show.time}</span>
            <span className="price" style={showHeaderItemStyle}>{show.price}</span>
            <i className="fa fa-bullseye"></i>
            <i className="fa fa-heartbeat"></i>
            <i className="fa fa-lock"></i>
          </div>
          <div className="bands">
            {show.bands.map((band, i)=>
              <BandItem band={band} index={i}/>
            )}
          </div>
        </div>
      );
  }
}

ShowsList.propTypes = {
    show: PropTypes.object.isRequired,
};

import React, { PropTypes, Component } from 'react';
import BandItem from './BandItem';

import styles from './ShowItem.styl';
require('font-awesome-webpack');

export default class ShowsList extends Component {
  render() {
      const { show } = this.props;

      return (
        <div key={show.id}>
          <div className="show" style={styles.show}>
            <span className="headerItem"><b>{show.venue}</b></span>
            <span className="headerItem">{show.time}</span>
            <span className="headerItem">{show.price}</span>
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

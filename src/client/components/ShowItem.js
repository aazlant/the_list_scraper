import React, { PropTypes, Component } from 'react';
import BandItem from './BandItem';

import styles from './ShowItem.styl';
require('font-awesome-webpack');

export default class ShowsList extends Component {
  render() {
      const { show, key } = this.props;

      return (
        <div key={key}>
          <div className={styles.bands}>
            <span className={styles.headerItem}><b>{show.venue}</b></span>
            <span className={styles.headerItem}>{show.time}</span>
            <span className={styles.headerItem}>{show.price}</span>
            <i className="fa fa-bullseye"></i>
            <i className="fa fa-heartbeat"></i>
            <i className="fa fa-lock"></i>
          </div>
          <div className={styles.bands}>
            {show.bands.map((band, i)=>
              <BandItem band={band} key={i}/>
            )}
          </div>
        </div>
      );
  }
}

ShowsList.propTypes = {
    show: PropTypes.object.isRequired,
    key: PropTypes.object.isRequired,
};

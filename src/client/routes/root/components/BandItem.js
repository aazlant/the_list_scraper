import React, { PropTypes, Component } from 'react';
import styles from './BandItem.styl';

export default class BandItem extends Component {
  render() {
      const { band } = this.props;

      return (
          <div className={styles.band} ><i className="fa fa-spotify"/>{band}</div>
      );
  }
}

BandItem.propTypes = {
    band: PropTypes.string.isRequired,
};

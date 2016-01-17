import React, { PropTypes, Component } from 'react';
import styles from './BandItem.styl';

// const bandStyle = {marginLeft: '4em', fontStyle: 'italic'};

export default class BandItem extends Component {
  render() {
      const { band } = this.props;

      return (
          <div className={styles.band} >{band}</div>
      );
  }
}

BandItem.propTypes = {
    band: PropTypes.string.isRequired,
};

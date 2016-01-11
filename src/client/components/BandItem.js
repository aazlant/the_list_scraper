import React, { PropTypes, Component } from 'react';
import styles from './BandItem.styl';

// const bandStyle = {marginLeft: '4em', fontStyle: 'italic'};

export default class BandItem extends Component {
  render() {
      const { band, index } = this.props;

      console.log(styles);
      return (
          <div className="band" key={index}>{band}</div>
      );
  }
}

BandItem.propTypes = {
    band: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired,
};

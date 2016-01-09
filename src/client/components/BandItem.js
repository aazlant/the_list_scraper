import React, { PropTypes, Component } from 'react';

const bandStyle = {marginLeft: '4em', fontStyle: 'italic'};

export default class BandItem extends Component {
  render() {
      const { band, index } = this.props;

      return (
          <div className="band" style={bandStyle} key={index}>{band}</div>
      );
  }
}

BandItem.propTypes = {
    band: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired,
};

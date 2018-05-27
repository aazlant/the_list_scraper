import PropTypes from 'prop-types';
import React, { Component } from 'react';
import styles from './BandItem.styl';

export default function BandItem(props) {
    const { band } = props;

    return (
        <div className={styles.band} ><i className="fa fa-spotify"/>{band}</div>
    );
}

BandItem.propTypes = {
    band: PropTypes.string.isRequired,
};

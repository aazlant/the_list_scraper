import React, { PropTypes, Component } from 'react';
import styles from './CustomEventComponent.styl';

export default class CustomEventComponent extends Component {

  render() {
      const { event, title } = this.props;
      return (
        <div className={styles.root}>
          <span className={styles.delete}>×</span>
          <span className={styles.title}>{title}</span>
        </div>
      );
  }
}

CustomEventComponent.propTypes = {
    event: PropTypes.object.isRequired,
    title: PropTypes.string.isRequired,
};

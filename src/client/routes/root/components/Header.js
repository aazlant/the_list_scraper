import React, { PropTypes, Component } from 'react';
import { Button } from 'react-bootstrap';

import ImmutablePropTypes from 'react-immutable-proptypes';
import { Application } from '../../../modules/application/records/application';

import styles from './Header.styl';

export default class Header extends Component {
  render() {
      const { actions: {toggleLoginModal}, application } = this.props;

      return (
          <div>
              <h1 className={styles.header}>San Francisco Bay Area Concert Calendar</h1>
              <div className={styles.subHeader}>- Shows via Steve Koepke's <a href="http://www.calweb.com/~skoepke/">local concert guide</a> -</div>

              <div className={styles.login}>
                <Button onClick={toggleLoginModal} bsStyle="primary">Login</Button>
              </div>
        </div>

      );
  }
}

Header.propTypes = {
    actions: PropTypes.object.isRequired,
    application: ImmutablePropTypes.recordOf(Application).isRequired,
};

import React, { PropTypes, Component } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { Application } from '../../../modules/application/records/application';

import { Modal, Button } from 'react-bootstrap';
import styles from './LoginModal.styl';

export default class Header extends Component {
  render() {
      const { actions: { toggleLoginModal }, application } = this.props;
      const modalState = application.toJS().loginModalOpen;

      return (
            <Modal
              className={styles.modal}
              show={modalState}
              onHide={toggleLoginModal}
            >
              <Modal.Header>
                <h1>Login / Register</h1>
              </Modal.Header>
              <Modal.Body>
                <Button><i bsStyle="primary" className="fa fa-google"/>  Login with Google</Button>
              </Modal.Body>

            </Modal>
      );
  }
}

Header.propTypes = {
    actions: PropTypes.object.isRequired,
    application: ImmutablePropTypes.recordOf(Application).isRequired,
};

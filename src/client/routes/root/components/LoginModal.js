import React, { PropTypes, Component } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { Application } from '../../../modules/application/records/application';

import { Modal, Button } from 'react-bootstrap';
import styles from './LoginModal.styl';

export default class LoginModal extends Component {
  render() {
      const { actions: { toggleLoginModal, getAuthRedirect }, application } = this.props;
      const modalState = application.toJS().loginModalOpen;

      return (
            <Modal
              className={styles.modal}
              show={modalState}
              onHide={toggleLoginModal}
              bsSize="large"
            >
              <Modal.Header>
                <h1>Login / Register</h1>
              </Modal.Header>
              <Modal.Body>
                <div className={styles.loginButton}>
                  <Button bsStyle="info" bsSize="large">
                    Login / Register
                  </Button>
                </div>
                <div className={styles.loginButton}>
                  <Button bsStyle="danger" bsSize="large" onClick={getAuthRedirect}>
                    <i className="fa fa-google"/>
                    <span className={styles.buttonTextWithIcon}>Login with Google</span>
                  </Button>
                </div>
                <div className={styles.loginButton}>
                  <Button bsStyle="primary" bsSize="large">
                    <i className="fa fa-facebook"/>
                    <span className={styles.buttonTextWithIcon}>Login with Facebook</span>
                  </Button>
                </div>
              </Modal.Body>

            </Modal>
      );
  }
}

LoginModal.propTypes = {
    actions: PropTypes.object.isRequired,
    application: ImmutablePropTypes.recordOf(Application).isRequired,
};

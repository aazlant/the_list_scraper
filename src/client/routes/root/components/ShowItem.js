import React, { PropTypes, Component } from 'react';
import { Button } from 'react-bootstrap';
import BandItem from './BandItem';

import styles from './ShowItem.styl';

export default class ShowItem extends Component {

  render() {
      const { show, date, actions } = this.props;

      return (
        <div className={styles.root}>
          <div className={styles.header}>
            <Button className={styles.plusSign} bsStyle="link" onClick={()=> {
                actions.addEventToCurrentCalendar({
                    show: show,
                    date: date,
                },
                actions
                );
            }}>
            <i className="fa fa-calendar-plus-o"/></Button>
            <span className={styles.headerItem}><b>{show.venue}</b></span>
            <span className={styles.headerItem}>{show.time}</span>
            <span className={styles.headerItem}>{show.price}</span>
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

ShowItem.propTypes = {
    show: PropTypes.object.isRequired,
};

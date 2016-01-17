import React, { PropTypes, Component } from 'react';
import ShowsList from './ShowsList';
import ShowsFilter from './ShowsFilter';
import styles from './ShowsPanel.styl';


export default class ShowsPanel extends Component {
  render() {
      const {
        shows: {items, isFetching, lastUpdated},
        filter,
        actions: {setVenueFilter},
      } = this.props;

      return (
        <div className={styles.root}>
          <ShowsFilter items={items} filter={filter} actions={{setVenueFilter}}/>
          <p>
            {lastUpdated &&
              <span>
                Last updated at {new Date(lastUpdated).toLocaleTimeString()}.
                {' '}
              </span>
            }
          </p>
          {isFetching && items.length === 0 &&
            <h2>Loading...</h2>
          }
          {!isFetching && items.length === 0 &&
            <h2>Empty.</h2>
          }
          {items.length > 0 &&
            <div>
              <ShowsList items={items} filter={filter} />
            </div>
          }
        </div>
      );
  }
}

ShowsPanel.propTypes = {
    shows: PropTypes.object.isRequired,
    filter: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
};

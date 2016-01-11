import React, { PropTypes, Component } from 'react';
import ShowsList from './ShowsList';
import styles from './ShowsList.styl';

export default class ShowsPanel extends Component {
  render() {
      const { shows: {items, isFetching, lastUpdated} } = this.props;
      return (
        <div>
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
              <ShowsList items={items} />
            </div>
          }
        </div>
      );
  }
}

ShowsPanel.propTypes = {
    shows: PropTypes.object.isRequired,
};

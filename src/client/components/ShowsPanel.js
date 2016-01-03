import React, { PropTypes, Component } from 'react';
import ShowsList from './ShowsList';

export default class ShowsPanel extends Component {
  render() {
      const { items, isFetching, lastUpdated, handleRefreshClick } = this.props;
      return (
        <div>
          <p>
            {lastUpdated &&
              <span>
                Last updated at {new Date(lastUpdated).toLocaleTimeString()}.
                {' '}
              </span>
            }
            {!isFetching &&
              <a href="#"
                 onClick={handleRefreshClick}>
                Refresh
              </a>
            }
          </p>
          {isFetching && items.length === 0 &&
            <h2>Loading...</h2>
          }
          {!isFetching && items.length === 0 &&
            <h2>Empty.</h2>
          }
          {items.length > 0 &&
            <div style={{ opacity: isFetching ? 0.5 : 1 }}>
              <ShowsList items={items} />
            </div>
          }
        </div>
      );
  }
}

ShowsPanel.propTypes = {
    items: PropTypes.array.isRequired,
    isFetching: PropTypes.bool.isRequired,
    handleRefreshClick: PropTypes.func.isRequired,
    lastUpdated: PropTypes.number,
};

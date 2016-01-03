import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchShowsIfNeeded, invalidateShows } from '../actions';
import ShowsPanel from '../components/ShowsPanel';

class App extends Component {
  constructor(props) {
      super(props);
      this.handleRefreshClick = this.handleRefreshClick.bind(this);
  }

  componentDidMount() {
      const { dispatch } = this.props;
      dispatch(fetchShowsIfNeeded());
  }

  componentWillReceiveProps(nextProps) {
      const { dispatch } = nextProps;
      dispatch(fetchShowsIfNeeded());
  }

  // QUESTION: should dispatch() propagate down to components?
  handleRefreshClick(e) {
      e.preventDefault();
      const { dispatch } = this.props;
      dispatch(invalidateShows());
      dispatch(fetchShowsIfNeeded());
  }

  render() {
      const { items, isFetching, lastUpdated } = this.props;
      return (
        <ShowsPanel items={items} lastUpdated={lastUpdated} isFetching={isFetching} handleRefreshClick={this.handleRefreshClick}/>
      );
  }
}

App.propTypes = {
    items: PropTypes.array.isRequired,
    isFetching: PropTypes.bool.isRequired,
    lastUpdated: PropTypes.number,
    dispatch: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
    const { shows } = state;
    const {
      isFetching,
      lastUpdated,
      items,
    } = shows || {
        isFetching: true,
        items: [],
    };

    return {
        items,
        isFetching,
        lastUpdated,
    };
}

export default connect(mapStateToProps)(App);

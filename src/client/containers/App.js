import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { fetchShowsIfNeeded, invalidateShows } from '../actions'
import Shows from '../components/Shows'

class App extends Component {
  constructor(props) {
    super(props)
    this.handleRefreshClick = this.handleRefreshClick.bind(this)
  }

  componentDidMount() {
    const { dispatch } = this.props
    dispatch(fetchShowsIfNeeded())
  }

  componentWillReceiveProps(nextProps) {
      const { dispatch } = nextProps
      dispatch(fetchShowsIfNeeded())
  }

  handleRefreshClick(e) {
    e.preventDefault()

    const { dispatch } = this.props
    dispatch(invalidateShows())
    dispatch(fetchShowsIfNeeded())
  }

  render() {
    const { items, isFetching, lastUpdated } = this.props
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
               onClick={this.handleRefreshClick}>
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
            <Shows items={items} />
          </div>
        }
      </div>
    )
  }
}

App.propTypes = {
  items: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  lastUpdated: PropTypes.number,
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  const { shows } = state
  const {
    isFetching,
    lastUpdated,
    items,
  } = shows || {
    isFetching: true,
    items: undefined
  }

  return {
    items,
    isFetching,
    lastUpdated
  }
}

export default connect(mapStateToProps)(App)

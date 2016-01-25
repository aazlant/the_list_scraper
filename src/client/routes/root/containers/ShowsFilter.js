// #TODO: make more functionally-oriented

import React, { PropTypes, Component } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';

import { Filter } from '../../../modules/shows/records/filters';
import { Item } from '../../../modules/shows/records/shows';

import Dropdown from '../components/Dropdown';
import { sortBy } from 'lodash';

import styles from './ShowsFilter.styl';

const prepareItemsByGroup = (items)=> {
    // receives: a list of Items (/src/client/modules/shows/records/shows.js)
    //
    // returns: a hash that maps
    //      `bands` to an alphabtical list of band names
    //      `venues` to an alphabetical list of venue names

    const venues = [];
    const venueNames = [];
    const bands = [];
    const bandNames = [];
    for (const index in items) {
        const item = items[index].toObject();
        const venue = item.venue;
        const bandList = item.bands;

        if (venueNames.indexOf(venue) < 0) {
            venues.push({
                label: venue,
                value: venue,
                group: 'venue',
            });
            venueNames.push(venue);
        }

        for (const i in bandList) {
            const band = bandList[i];
            if (bandNames.indexOf(band) < 0) {
                bands.push({
                    label: band,
                    value: band,
                    group: 'artist',
                });
                bandNames.push(band);
            }
        }
    }

    return {
        bands: sortBy([...bands], (band)=>{return band.value;} ),
        venues: sortBy([...venues], (venue)=>{return venue.value;} ),
    };
};


export default class ShowsFilter extends Component {

  render() {
      const { actions, filter } = this.props;
      const items = this.props.items.toArray();
      const venuesFilter = filter.get('venues').toArray();
      const bandsFilter = filter.get('bands').toArray();
      const itemsByGroup = prepareItemsByGroup(items);
      return (
        <div className={styles.root}>

            <Dropdown placeholder="Select Bands"
                  options={itemsByGroup.bands}
                  onChange={actions.setBandFilter}
                  searchable
                  value={bandsFilter}
                  clearable={false}
                  multi
                  />

            <Dropdown placeholder="Select Venues"
                  options={itemsByGroup.venues}
                  onChange={actions.setVenueFilter}
                  searchable
                  value={venuesFilter}
                  clearable={false}
                  multi
                  />

        </div>
      );
  }
}

ShowsFilter.propTypes = {
    filter: ImmutablePropTypes.recordOf(Filter).isRequired,
    items: ImmutablePropTypes.listOf(ImmutablePropTypes.recordOf(Item)).isRequired,
    actions: PropTypes.object.isRequired,
};

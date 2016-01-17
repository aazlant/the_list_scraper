import React, { PropTypes, Component } from 'react';
import Dropdown from './Dropdown';
import { sortBy } from 'lodash';

const prepareItemsByGroup = (items)=> {
    const venues = [];
    const venueNames = [];
    const bands = [];
    const bandNames = [];
    for (const index in items) {
        const item = items[index];
        const venue = item.venue;
        const bandList = item.bands;

        if (venueNames.indexOf(venue) < 0) { // #TODO: do this with IDs
            venues.push({
                id: venue,
                name: venue,
                group: 'venue',
            });
            venueNames.push(venue);
        }

        for (const i in bandList) {
            const band = bandList[i];
            if (bandNames.indexOf(band) < 0) { // #TODO: do this with IDs
                bands.push({
                    id: band,
                    name: band,
                    group: 'artist',
                });
                bandNames.push(band);
            }
        }
    }

    return {
        bands: sortBy([...bands], (venue)=>{return venue.name;} ),
        venues: sortBy([...venues], (venue)=>{return venue.name;} ),
    };
};


export default class ShowsFilter extends Component {

  render() {
      const { items, actions } = this.props;
      const itemsByGroup = prepareItemsByGroup(items);

      return (
        <div>
            {/* Dropdown placeholder="Select Bands"
                  options={itemsByGroup.bands}
                  onChange={actions.setVenueFilter}
                  searchable
                  multiple */}
            <Dropdown placeholder="Select Venues"
                  options={itemsByGroup.venues}
                  onChange={actions.setVenueFilter}
                  searchable
                  clearable={false}
                  tags />
        </div>
      );
  }
}

ShowsFilter.propTypes = {
    items: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired,
};

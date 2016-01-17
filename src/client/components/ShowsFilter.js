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
        bands: sortBy([...bands], (venue)=>{return venue.name;} ),
        venues: sortBy([...venues], (venue)=>{return venue.name;} ),
    };
};


export default class ShowsFilter extends Component {

  render() {
      const { items, actions, filter: {venues} } = this.props;
      const itemsByGroup = prepareItemsByGroup(items);

      return (
        <div>
            <Dropdown placeholder="Select Bands"
                  options={itemsByGroup.bands}
                  onChange={()=>{}}
                  searchable
                  value={[]}
                  clearable={false}
                  multi
                  />
            <Dropdown placeholder="Select Venues"
                  options={itemsByGroup.venues}
                  onChange={actions.setVenueFilter}
                  searchable
                  value={venues}
                  clearable={false}
                  multi
                  />
        </div>
      );
  }
}

ShowsFilter.propTypes = {
    filter: PropTypes.object.isRequired,
    items: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired,
};

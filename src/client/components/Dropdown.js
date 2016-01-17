import React, { PropTypes, Component } from 'react';
import ReactSelect from 'react-select';
import 'react-select/dist/react-select.css';


export default class Dropdown extends Component {

  render() {
      const { options, onChange, ...preferences } = this.props;
      return (
        <ReactSelect placeholder={preferences.placeholder}
                  options={options}
                  onChange={onChange}
                  value={preferences.value}
                  multi
                  searchable={preferences.searchable}
                  clearable={preferences.clearable}
                  />
      );
  }
}

Dropdown.propTypes = {
    options: PropTypes.array.isRequired,
    onChange: PropTypes.func.isRequired,
};

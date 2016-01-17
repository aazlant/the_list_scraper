import React, { PropTypes, Component } from 'react';
import ReactSuperSelect from 'react-super-select';
import 'react-super-select/lib/react-super-select.css';


export default class Dropdown extends Component {

  render() {
      const { options, onChange, ...preferences } = this.props;
      return (
        <ReactSuperSelect placeholder={preferences.placeholder}
                  dataSource={options}
                  onChange={onChange}
                  searchable={preferences.searchable}
                  clearable={preferences.clearable}
                  tags={preferences.tags} />
      );
  }
}

Dropdown.propTypes = {
    options: PropTypes.array.isRequired,
    onChange: PropTypes.func.isRequired,
};

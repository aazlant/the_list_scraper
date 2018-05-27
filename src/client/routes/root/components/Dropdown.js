import PropTypes from 'prop-types';
import React, { Component } from 'react';
import ReactSelect from 'react-select';
import 'react-select/dist/react-select.css';


export default function Dropdown(props) {
    const { options, onChange, ...preferences } = props;
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

Dropdown.propTypes = {
    options: PropTypes.array.isRequired,
    onChange: PropTypes.func.isRequired,
};

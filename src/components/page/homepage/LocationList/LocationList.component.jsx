import React from 'react';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

const LocationList = props => {
    if (Object.keys(props.images).length ===0) {
        return <div></div>;
    } else {
        const location = Object.keys(props.images)
        return (
            <Dropdown options={location} onChange={props.handleLocationChange} placeholder="Select a location"/>
        )
    }
}

export default LocationList;

import React from 'react';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import './locationlist.styles.css';

const LocationList = props => {
    if (Object.keys(props.images).length ===0) {
        return (
            <div className="dropdown-container">
                <Dropdown disabled/>
            </div>
        ) 
    } else {
        const location = Object.keys(props.images)
        return (
            <div className="dropdown-container">
                <Dropdown className="Dropdown" options={location} onChange={props.handleLocationChange} placeholder="Select a location"/>
            </div>
        )
    }
}

export default LocationList;

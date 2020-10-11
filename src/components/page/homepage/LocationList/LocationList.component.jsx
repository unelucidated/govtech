import React from 'react';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

const LocationList = props => {
    if (props.items===[]) {
        return <div>empty</div>;
    } else {
        let location = [];
        props.items.map((item, index) => 
            location.push([index, item.location.latitude, item.location.longitude])
        )
        console.log(location);
        return (
            <Dropdown options={location} onChange={props.handleLocationChange} placeholder="Select a location"/>
        )
    }
}

export default LocationList;

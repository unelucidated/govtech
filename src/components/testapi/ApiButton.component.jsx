import React from 'react';

const ApiButton = (props) => {
    return (
        <button id='ApiButton' onClick={props.handleChange}>Press to reload</button>
    )
} 

export default ApiButton;
import React from 'react';
import Button from '@material-ui/core/Button';

const ApiButton = (props) => {
    return (
        <Button id='ApiButton' onClick={props.handleChange} variant="contained">Press to reload</Button>
    )
} 

export default ApiButton;
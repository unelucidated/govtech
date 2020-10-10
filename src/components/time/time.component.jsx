//https://material-ui.com/components/pickers/

import React from 'react';
import TextField from '@material-ui/core/TextField';

const TimePicker = props => {
    return (
        <form noValidate>
            <TextField
                id="date"
                label="Vehicle date"
                type="date"
                defaultValue="2020-01-01"
                InputLabelProps={{
                shrink: true,
                }}
            />
        </form>
    )
}

export default TimePicker;
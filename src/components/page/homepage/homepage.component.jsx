import React from 'react';
import Button from '@material-ui/core/Button';
import TimePicker from '../../time/time.component';
import ScreenshotsDisplay from '../../screenshots/screenshots.component';

class HomePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            date: '',
            time: '',
            locations: [],
            weatherinfo: {},
            screenshots: [1,2,3]
        };
    }

    //add in handlers for onChange of input fields, start off with button to submit form

    

    render() {
        return (
            <div>
                <Button variant="contained">Hello World</Button>
                <TimePicker />
                <ScreenshotsDisplay screenshots={this.state.screenshots}/>
            </div>
        )
    }

}

export default HomePage;
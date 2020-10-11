import React from 'react';
import ScreenshotsDisplay from './screenshots/screenshots.component.jsx';
// import TestApi from '../../testapi/testapi.component';
// import DateAndTimePicker from './DateAndTimePicker/DateAndTimePicker.component';
import LocationList from './LocationList/LocationList.component';


class HomePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            time: '',
            items: [],
            location: [],
            weatherinfo: {},
            screenshots: [],
            isLoaded: false
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleLocationChange = this.handleLocationChange.bind(this);
    }

    //add in handlers for onChange of input fields, start off with button to submit form
    
    handleSubmit(event) {
        fetch(`https://api.data.gov.sg/v1/transport/traffic-images?date_time=${this.state.time}`)
            .then(res=>res.json())
            .then(
                (result) => {
                    this.setState({
                        items: result.items[0].cameras,
                        isLoaded: true
                    });
                    return result.items[0]
                }
            )
            // .then(
            //     result => {
            //         let arr = [];
            //         result.forEach(elem => {
            //             arr.append([elem.location.latitude, elem.location.longitude])
            //         });
            //     }
            // )
            .catch(error => console.log(error))
        event.preventDefault();
    }

    handleChange(event) {
        this.setState({time: event.target.value})
    }

    handleLocationChange(event) {
        console.log(event);
        this.setState({location: event.value})
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Time:
                        <textarea value={this.setState.value} onChange={this.handleChange} />
                    </label>
                    <input type="submit" value="Submit" />
                </form>
                <LocationList items={this.state.items} handleLocationChange={this.handleLocationChange}/>
                <ScreenshotsDisplay screenshots={this.state.screenshots} />
            </div>
        )
    }
}

export default HomePage;
import React from 'react';
import ScreenshotsDisplay from './screenshots/screenshots.component.jsx';
import LocationList from './LocationList/LocationList.component';
import DatePicker from 'react-datepicker';
import moment from 'moment';

import "react-datepicker/dist/react-datepicker.css";


class HomePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            time: '',
            items: [],
            location: [],
            weatherinfo: {},
            screenshots: [],
            isLoaded: false,
            startDate: new Date()
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleLocationChange = this.handleLocationChange.bind(this);
    }

    
    handleSubmit(event) {
        //convert to string
        let chosenTime = moment(this.state.startDate).format('YYYY-MM-DDTHH:MM:SS')
        console.log(chosenTime)
        fetch(`https://api.data.gov.sg/v1/transport/traffic-images?date_time=${chosenTime}`)
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
            //fetch from API2, reverse geolocation
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

    handleDateChange(date) {
        this.setState({
            startDate: date
        })
    }

    handleLocationChange(event) {
        this.setState({
            location: event.value,
        },
            this.storeScreenshots
        )
    }

    storeScreenshots() {
        this.setState({
            screenshots: this.state.items[this.state.location[0]]
        })
    }

    render() {
        return (
            <div>
                
                <form onSubmit={this.handleSubmit}>
                    <DatePicker 
                        selected={ this.state.startDate }
                        onChange={ this.handleDateChange }
                        timeInputLabel="Time:"
                        dateFormat="MM/dd/yyyy h:mm aa"
                        showTimeSelect
                        showYearDropdown
                        scrollableMonthYearDropdown
                        maxDate={new Date()}
                    />
                    <input type="submit" value="Submit" />
                </form>
                <LocationList items={this.state.items} handleLocationChange={this.handleLocationChange}/>
                <ScreenshotsDisplay screenshots={this.state.screenshots} />
            </div>
        )
    }
}

export default HomePage;
import React from 'react';
import ScreenshotsDisplay from './screenshots/screenshots.component.jsx';
import LocationList from './LocationList/LocationList.component';
import DatePicker from 'react-datepicker';
import moment from 'moment';

import './homepage.styles.css';
import "react-datepicker/dist/react-datepicker.css";
// import logo from './govtech.png';


class HomePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            items: [],
            location: [],
            nearestWeatherLocation: [],
            weatherHeader: [],
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
        let promise1 = fetch(`https://api.data.gov.sg/v1/transport/traffic-images?date_time=${chosenTime}`)
            .then(res=>res.json())
            .then(
                (result) => {
                    this.setState({
                        items: result.items[0].cameras,
                        isLoaded: true
                    });
                    return result.items[0].cameras
                }
            )
            .catch(error => console.log(error))
        
        let promise2 = fetch(`https://api.data.gov.sg/v1/environment/2-hour-weather-forecast?date_time=${chosenTime}`)
                .then(res=>res.json())
                .then(
                    (result) => {
                        this.setState({
                            weatherHeader: result.area_metadata,
                            weatherinfo: result.items[0]
                        });
                        return result.area_metadata
                    }
                )
                .catch(error => console.log(error))
        
        //find the nearest locations
        Promise.all([promise1, promise2]).then((values) => {
            let distances = [];
            //calculate array of distances of each camera location to nearest weather location
            for (let i = 0; i < values[0].length; i++) {
                let x = values[0][i].location.latitude;
                let y = values[0][i].location.longitude;
                let temp = [];
                for (let j = 0; j < values[1].length; j++) {
                    let dist = Math.sqrt((x-values[1][j].label_location.latitude)**2 + (y-values[1][j].label_location.longitude)**2)
                    temp.push(dist);
                }
                distances.push(temp)
            }
            return distances;
        }).then((result) => {
            let shortestIndex = [];
            for (let i = 0; i < result.length; i++) {
                shortestIndex.push(result[i].indexOf(Math.min(...result[i])))
            }
            return shortestIndex;
        }).then((result) => {
            this.setState({
                nearestWeatherLocation: result
            })
        }).catch(error => console.log(error))
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
            <div className={HomePage}>
                {/* <img src={logo} alt="Logo" className="center"/> */}
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
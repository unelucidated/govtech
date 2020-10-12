import React from 'react';
import ScreenshotsDisplay from './screenshots/screenshots.component.jsx';
import LocationList from './LocationList/LocationList.component';
import DatePicker from 'react-datepicker';
import moment from 'moment';

import './homepage.styles.css';
import "react-datepicker/dist/react-datepicker.css";
import WeatherDisplay from './weather/weatherinfo.component.jsx';
// import logo from './govtech.png';


class HomePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            items: [],
            location: '',
            weather:'',
            weatherHeader: [],
            weatherinfo: {},
            toDisplay: [],
            images: {},
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
            //shortestIndex contains the index of nearest weatherLocation to each camera location
            let shortestIndex = [];
            for (let i = 0; i < result.length; i++) {
                shortestIndex.push(result[i].indexOf(Math.min(...result[i])))
            }
            //creating a header containing uniqueLocations
            // let uniqueLocations = new Set(shortestIndex);
            //locationDict to store key:value pairs of location:[images]
            let locationDict = {};
            for (let i = 0; i < shortestIndex.length; i++) {
                let locationName = this.state.weatherHeader[shortestIndex[i]].name
                if (!locationDict[locationName]) {
                    locationDict[locationName] = []
                    locationDict[locationName].push(this.state.items[i].image)
                } else {
                    locationDict[locationName].push(this.state.items[i].image)
                }
            }
            // locationDict.uniqueLocations = uniqueLocations;
            return locationDict;
        }).then((result) => {
            this.setState({
                images: result
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
        console.log(event);
        let weather = '';
        for (let i = 0; i < this.state.weatherinfo.forecasts.length; i++) {
            if (this.state.weatherinfo.forecasts[i].area === event.value) {
                weather = this.state.weatherinfo.forecasts[i].forecast
                break;
            }
        }
        //how to set weather in state
        this.setState({
            location: event.value,
            toDisplay: this.state.images[event.value],
            weather: weather
        })
    }

    render() {
        return (
            <div className="homepage">
                <div className="form-container">
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
                </div>
                <LocationList 
                    images={this.state.images}
                    handleLocationChange={this.handleLocationChange}
                />
                <WeatherDisplay weather={this.state.weather}/>
                <ScreenshotsDisplay location={this.state.location} toDisplay={this.state.toDisplay} />
            </div>
        )
    }
}

export default HomePage;
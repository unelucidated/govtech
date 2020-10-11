import React from 'react';
import ApiButton from './ApiButton.component';

class TestApi extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            locations: [],
            items: [],
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange() {
        fetch('https://api.data.gov.sg/v1/transport/traffic-images?date_time=2020-01-01T07%3A30%3A00%2B08%3A00')
            .then(res=>res.json())
            .then(
                (result) => {
                    this.setState({
                        items: result.items[0].cameras
                    })
                    return result.items[0]
                }
            )
            .then(
                result => {
                    let arr;
                    result.forEach(elem => {
                        arr.append([elem.location.latitude, elem.location.longitude])
                    });
                }
            )
            .catch(error => console.log(error))
    }

    render() {
        const { error, items } = this.state;
        if (error) {
            return <div>Error: error.message</div>
        } else {
            return (
                <div>
                    <ApiButton handleChange={this.handleChange}/>
                    <ul>
                    {items.map(item => (
                        <li key = {item}>
                            {item.location.latitude} {item.location.longitude}
                        </li>
                    ))}
                    </ul>
                </div>
                
            )
        }
    }
}

export default TestApi;
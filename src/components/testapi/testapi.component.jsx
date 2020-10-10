import React from 'react';
import ApiButton from './ApiButton.component';

class TestApi extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            locations: '',
            items: [],
            isLoaded: false,
            penis: 'no'
        }
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        //fetch api data
        fetch('https://api.data.gov.sg/v1/transport/traffic-images?date_time=2020-01-01T07%3A30%3A00%2B08%3A00')
            .then(res=>res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        items: result.items[0].cameras
                    })
                }
            )
    }

    handleChange() {
        //call api here
        this.setState({penis: 'yes'})
    }

    render() {
        const { error, items, isLoaded } = this.state;
        if (error) {
            return <div>Error: error.message</div>
        } else if (!isLoaded) {
            return <div>Loading...</div>
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
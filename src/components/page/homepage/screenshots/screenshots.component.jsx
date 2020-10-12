import React from 'react';

function ScreenshotDisplay(props) {
    console.log(props)
    if (props.toDisplay.length === 0) {
        return (
            <div>Waiting for images...</div>
        )
    } else {
        return (
            <div>
                {props.toDisplay.map(elem => (
                    <div>
                        <img src={elem} alt="new"/>
                    </div>
                ))}
            </div>
        )
    }
    
}

export default ScreenshotDisplay;
import React from 'react';

function ScreenshotDisplay(props) {
    return (
        <div className='screenshot-display'>
            <img src={props.screenshots.image} alt=''/>
        </div>
        
    )
}

export default ScreenshotDisplay;
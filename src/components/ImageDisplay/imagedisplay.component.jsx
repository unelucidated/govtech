import React from 'react';
import './imagedisplay.styles.css';

function ImageDisplay(props) {
    console.log(props)
    if (props.toDisplay.length === 0) {
        return (
            <div className="empty-container"></div>
        )
    } else {
        return (
            <div className="flex-container">
                {props.toDisplay.map(elem => (
                    <div>
                        <img src={elem} alt="new"/>
                    </div>
                ))}
            </div>
        )
    }
    
}

export default ImageDisplay;
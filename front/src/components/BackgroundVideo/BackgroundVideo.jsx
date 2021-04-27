import React from 'react'
import './background-video-styles.css'
import BackgroundVideo from 'assets/bg.mp4'

const BackgroundVideoRun = () => {
    return (
        <video autoPlay loop muted className='background-video-home'>
            <source src={BackgroundVideo} type="video/mp4" />
        </video>
    )
}

export default BackgroundVideoRun
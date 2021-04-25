import React from 'react'
import LogoSpotify from 'assets/logo-spotify.jpg'

const App = () => {
    return (
        <div className='page' style={{backgroundColor: 'black', justifyContent: 'center', display:'flex'}}>
            <img src={LogoSpotify} alt="LogoSpotify" style={{marginLeft: '7em'}}/>
        </div>
    )
}

export default App

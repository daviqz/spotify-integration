import React, { memo } from 'react'
import { Grid } from '@material-ui/core'
import { Link } from 'react-router-dom'
import MainLogo from 'assets/logo.png'
import './header-styles.css'

const Header = () => {

    return (
        <Grid container className='header-container'>
            <Link to='/'>
                <div className='logo-container'>
                    <img src={MainLogo} className='logo-image' alt='Tree'/>
                </div>
            </Link>
            <Grid item className='header-menu-items-container'>
                <Link to='/'>
                    Home 
                </Link>
                
                <Link to='/spotify' style={{marginLeft: '5em'}}>
                    Spotify
                </Link>

            </Grid>
        </Grid>
    )
}

export default memo(Header)
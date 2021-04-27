import React, { useState } from 'react'
import axios from 'axios'
import { Input, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, Grid, Button } from '@material-ui/core'
import NoImage from 'assets/no-image.png'
import BackgroundVideo from 'components/BackgroundVideo/BackgroundVideo'
import './spotify.css'

const App = () => {
    const [searchWord, setSearchWord] = useState('')
    const [type, setType] = useState('')
    const [itensBusca, setItensBusca] = useState(null)

    const search = () => {
        axios.get(`http://localhost:4000/search-user?search=${searchWord}&type=${type}`)
        .then(response => {
            let objectName = ''
            switch (type) {
                case 'album':
                    objectName = 'albums'
                    break
                case 'artist':
                    objectName = 'artists'
                    break
                case 'playlist':
                    objectName = 'playlists'
                    break
                case 'track':
                    objectName = 'tracks'
                    break
                default:
                    break
            }
            setItensBusca({[objectName]: response.data[objectName]})
        })
    }

    const RenderItems = () => {
        let content = <div></div>

        if(itensBusca?.albums) {
            content = <Grid container style={{display: 'flex', justifyContent: 'center'}}>
                {itensBusca.albums?.items.map((album, index) => (
                    <Grid item key={index}>
                        <div className='text-shadow' style={{display: 'flex', justifyContent: 'center', color: 'white'}}>{album.name}</div>
                        {album.images[0]?.url ? <img src={album.images[0]?.url} alt='img' width='300' height='300'/> : <img src={NoImage} alt='img' width='300' height='300'/>}
                    </Grid>
                ))}
            </Grid>
        } else if(itensBusca?.artists) {
            content = <Grid container style={{display: 'flex', justifyContent: 'center'}}>
                {itensBusca.artists?.items.map((artist, index) => (
                    <Grid item key={index}>
                        <div className='text-shadow' style={{display: 'flex', justifyContent: 'center', color: 'white'}}>{artist.name}</div>
                        {artist.images[0]?.url ? <img src={artist.images[0]?.url} alt='img' width='300' height='300'/> : <img src={NoImage} alt='img' width='300' height='300'/>}
                    </Grid>
                ))}
            </Grid>
        } else if (itensBusca?.playlists) {
            content = <Grid container style={{display: 'flex', justifyContent: 'center'}}>
                {itensBusca.playlists?.items.map((playlist, index) => (
                    <Grid item key={index}>
                        <div className='text-shadow' style={{display: 'flex', justifyContent: 'center', color: 'white'}}>{playlist.name}</div>
                        {playlist.images[0]?.url ? <img src={playlist.images[0]?.url} alt='img' width='300' height='300'/> : <img src={NoImage} alt='img' width='300' height='300'/>}
                    </Grid>
                ))}
            </Grid>
        } else if (itensBusca?.tracks) {
            content = <Grid container style={{display: 'flex', justifyContent: 'center'}}>
                {itensBusca.tracks?.items.map((track, index) => (
                    <Grid item key={index}>
                        <div className='text-shadow' style={{display: 'flex', justifyContent: 'center', color: 'white'}}>{track.name}</div>
                        <Grid style={{display: 'flex', justifyContent: 'space-evenly', color: 'white'}}>{track.artists.map(artist => <div>{artist.name}</div>)}</Grid>
                        {track.album.images[0]?.url ? <img src={track.album.images[0]?.url} alt='img' width='300' height='300'/> : <img src={NoImage} alt='img' width='300' height='300'/>}
                    </Grid>
                ))}
            </Grid>
        }

        return (
            <Grid container direction='column' alignItems='center' style={{paddingTop: '5em'}}>
                {content}
            </Grid>
        )
    }
 
    return (
        <div className='page'>
            <BackgroundVideo/>
            <Grid container direction='column' alignItems='center' style={{paddingTop: '5em', color: 'white'}}>
                <Grid>
                    <FormControl component='fieldset'>
                        <FormLabel component='legend' className='text-shadow' style={{color: 'white', fontSize: '2em'}}>Tipo de busca</FormLabel>
                        <RadioGroup aria-label='type' name='type' value={type} onChange={(e)=>setType(e.target.value)} row>
                            <FormControlLabel className='text-shadow' value='album' control={<Radio />} label='Album' />
                            <FormControlLabel className='text-shadow' value='artist' control={<Radio />} label='Artista' />
                            <FormControlLabel className='text-shadow' value='playlist' control={<Radio />} label='Playlist' />
                            <FormControlLabel className='text-shadow' value='track' control={<Radio />} label='Música' />
                        </RadioGroup>
                    </FormControl>
                </Grid>
                <Grid style={{marginTop: '2em'}}>
                    <Input 
                        inputProps={{
                            style: {color: 'purple', textShadow: '-1px 0 white, 0 1px white, 1px 0 white, 0 -1px white'}
                        }} 
                        onChange={(e)=>setSearchWord(e.target.value)} value={searchWord} placeholder='Buscar' style={{width: '10em', textAlign: 'center', color: 'purple', fontWeight: 'bold', fontSize: '1.3em'}}
                    />
                </Grid>
                <Grid style={{marginTop: '2em'}}>
                    <Button variant="contained" color="primary" style={{backgroundImage: 'linear-gradient(to right, black, #0E3909)', color: 'white', fontSize: '1.2em'}} size='large' onClick={search}>buscar</Button>
                </Grid>
            </Grid>
            <RenderItems/>            
        </div>
    )
}

export default App

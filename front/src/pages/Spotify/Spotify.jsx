import React, { useState } from 'react'
import axios from 'axios'
import { Input, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, Grid, Button } from '@material-ui/core'
import NoImage from 'assets/no-image.png'

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
                        <div style={{display: 'flex', justifyContent: 'center'}}>{album.name}</div>
                        {album.images[0]?.url ? <img src={album.images[0]?.url} alt='img' width='300' height='300'/> : <img src={NoImage} alt='img' width='300' height='300'/>}
                    </Grid>
                ))}
            </Grid>
        } else if(itensBusca?.artists) {
            content = <Grid container style={{display: 'flex', justifyContent: 'center'}}>
                {itensBusca.artists?.items.map((artist, index) => (
                    <Grid item key={index}>
                        <div style={{display: 'flex', justifyContent: 'center'}}>{artist.name}</div>
                        {artist.images[0]?.url ? <img src={artist.images[0]?.url} alt='img' width='300' height='300'/> : <img src={NoImage} alt='img' width='300' height='300'/>}
                    </Grid>
                ))}
            </Grid>
        } else if (itensBusca?.playlists) {
            content = <Grid container style={{display: 'flex', justifyContent: 'center'}}>
                {itensBusca.playlists?.items.map((playlist, index) => (
                    <Grid item key={index}>
                        <div style={{display: 'flex', justifyContent: 'center'}}>{playlist.name}</div>
                        {playlist.images[0]?.url ? <img src={playlist.images[0]?.url} alt='img' width='300' height='300'/> : <img src={NoImage} alt='img' width='300' height='300'/>}
                    </Grid>
                ))}
            </Grid>
        } else if (itensBusca?.tracks) {
            content = <Grid container style={{display: 'flex', justifyContent: 'center'}}>
                {itensBusca.tracks?.items.map((track, index) => (
                    <Grid item key={index}>
                        <div style={{display: 'flex', justifyContent: 'center'}}>{track.name}</div>
                        <Grid style={{display: 'flex', justifyContent: 'space-evenly'}}>{track.artists.map(artist => <div>{artist.name}</div>)}</Grid>
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
        <div className='page' style={{backgroundColor: '#E7E0E0'}}>
            <Grid container direction='column' alignItems='center' style={{paddingTop: '5em'}}>
                <Grid>
                    <FormControl component='fieldset'>
                        <FormLabel component='legend'>Tipo de busca</FormLabel>
                        <RadioGroup aria-label='type' name='type' value={type} onChange={(e)=>setType(e.target.value)} row>
                            <FormControlLabel value='album' control={<Radio />} label='Album' />
                            <FormControlLabel value='artist' control={<Radio />} label='Artista' />
                            <FormControlLabel value='playlist' control={<Radio />} label='Playlist' />
                            <FormControlLabel value='track' control={<Radio />} label='Música' />
                        </RadioGroup>
                    </FormControl>
                </Grid>
                <Grid style={{marginTop: '2em'}}>
                    <Input onChange={(e)=>setSearchWord(e.target.value)} value={searchWord} placeholder='Buscar' style={{width: '10em', textAlign: 'center'}}/>
                </Grid>
                <Grid style={{marginTop: '2em'}}>
                    <Button variant="contained" color="primary" onClick={search}>buscar</Button>
                </Grid>
            </Grid>
            <RenderItems/>            
        </div>
    )
}

export default App

const SpotifyController = require('./controller/SpotifyController')

const routes = [
    {
        path: `/search-user`, 
        method: 'get', 
        handler: SpotifyController.search
    }
]

module.exports = routes
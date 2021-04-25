//Esse é o famoso controller que faz toda a função do servidor

const axios = require('axios')
var request = require('request')
//Spotify
const clientId = '696cf9135183457a8429a2577b4bf773'
const clientSecret = '528d26f35dd44c6a8d27cfa3bac4d251'
const encodedData = Buffer.from(clientId + ':' + clientSecret).toString('base64')
const getClientAuthOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: {
        'Authorization': 'Basic ' + encodedData
    },
    form: {
        grant_type: 'client_credentials'
    },
    json: true
}

const search = async (req, res) => {
    const { search, type } = req.query
    const limit = 5 // pode alterar o limite pra ir mais dados pro front

    request.post(getClientAuthOptions, (error, response, body) => {
        var token = body.access_token

        var options = {
            url: `https://api.spotify.com/v1/search?q=${search}&type=${type}&limit=${limit}`,
            headers: {
              'Authorization': 'Bearer ' + token
            },
            json: true
        }

        request.get(options, (error, response, body) => {
            res.send(body)
        })
    })
}

module.exports = {
    search
}
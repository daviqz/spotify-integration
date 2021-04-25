const express = require('express')
const app = express()
const cors = require('cors')
const port = 4000
const routes = require('./routes')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))

routes.forEach(route => {
    switch(route.method) {
        case 'get': app.get(route.path, route.handler); return
        case 'post': app.post(route.path, route.handler); return
        case 'delete': app.delete(route.path, route.handler); return
    }    
})

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`)
})
const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

//Define paths for express config
const publicPathDir = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicPathDir))

// 'req' = incoming request from client, 'res' = what is going to be sent back to user

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather app',
        name: 'Tamema'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Tamema'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help text',
        name: 'Tamema'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send ({
            error: 'please provide an address.'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastdata) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                forecast: forecastdata,
                location: location,
            })
        })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term.'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('error', {
        message: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('error', {
        message: 'Page not found'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})
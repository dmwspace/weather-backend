const express = require('express')
const request = require('request')
const cors = require('cors')
const { wakeDynos } = require('heroku-keep-awake');

const DYNO_URLS = [
    'https://dean-wright-weather-backend.herokuapp.com/',
    'https://dean-wright-weather-app.herokuapp.com/'
]
const opts = {
    interval: 29,
    logging: false,
    stopTimes: {start: '16:00', end: '5:00'}
}

const app = express()
const port = process.env.PORT || 4000


const corsOptions = {
    origin: '*'
}

app.listen(PORT, () => {
    wakeDynos(DYNO_URLS, opts)
})

app.get('/backend_current', cors(corsOptions), (req, res) => {
    const url = `http://api.weatherbit.io/v2.0/current?postal_code=${req.query.zip}&country=US&units=I&key=${req.query.key}`
    request({url, method: 'GET', json: true}, (error, {body}) => {
        if (error) {
            return console.log('Error', error)
        }
        res.send(body)
    })
})

app.get('/backend_fiveDay', cors(corsOptions), (req, res) => {
    const url = `https://api.weatherbit.io/v2.0/forecast/daily?postal_code=${req.query.zip}&country=US&days=5&units=I&key=${req.query.key}`
    request({url, method: 'GET', json: true}, (error, {body}) => {
        if (error) {
            return console.log('Error2', error)
        }
        console.log(body)
        res.send(body)
    })
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})
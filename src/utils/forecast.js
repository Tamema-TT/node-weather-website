const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.openweathermap.org/data/2.5/weather?lat='+latitude+'&lon='+longitude+'&appid=fef9b388ece01a0d5350aec9d3a5d93b&units=metric'
    request({url, json:true}, (error, {body}) => {
        if(error){
            callback('Unable to connect to weather service!',undefined)
        } else if (body.message) {
            callback('Unable to find location! Try another search.', undefined)
        } else {
            callback(undefined, 'Current Temperature is '+ body.main.temp +' Degree C and humidity is '+body.main.humidity+'.')
        }
    })
} 

module.exports = forecast

// https://api.openweathermap.org/data/2.5/weather?lat=22.8135&lon=89.5672&appid=fef9b388ece01a0d5350aec9d3a5d93b&units=metric
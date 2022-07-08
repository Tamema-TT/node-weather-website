const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.openweathermap.org/data/2.5/weather?q='+ encodeURIComponent(address) +'&appid=fef9b388ece01a0d5350aec9d3a5d93b&units=metric'
    request({url, json:true}, (error, {body}) => {
        if(error){
            callback('Unable to connect to weather service!',undefined)
        } else if (body.message) {
            callback('Unable to find location! Try another search.', undefined)
        } else {
            callback(undefined, {
                latitude: body.coord.lat,
                longitude: body.coord.lon,
                location: body.name +' '+body.sys.country
            })
        }
    })
} 

module.exports = geocode
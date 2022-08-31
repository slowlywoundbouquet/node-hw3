const http = require('http');
require('dotenv').config();
const config = require('./config.js');

const key = process.env.apikey
let city = config.city
console.log(`Автоматически назначен город: ${city}\n`)

const url = `http://api.weatherstack.com/current?access_key=${key}&query=${city}`;


http.get(url, (res) => {
    const {statusCode} = res
    if (statusCode !== 200){
        console.log(`Status: ${statusCode}`)
        return
    }

    res.setEncoding('utf8')
    let rawData = ''
    res.on('data', (chunk) => rawData += chunk)
    res.on('end', () => {
        let parseData = JSON.parse(rawData)

        if (parseData.error) {
            console.error(`Ошибка: ${parseData.error.info}`)
            return
        }
        console.log(`Город: ${parseData.location.name}`)
        console.log(`Температура воздуха: ${parseData.current.temperature}`);
        console.log(`Давление: ${parseData.current.pressure}`);
    })

}).on('error', (err) => {
    console.error(`Ошибка запроса: ${err.message}`)
})




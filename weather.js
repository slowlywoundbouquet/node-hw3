const http = require('http');
require('dotenv').config();
const config = require('./config.js');

const key = process.env.apikey
let city = process.argv.slice(2)[0]
console.log(`Вы выбрали город: ${city}\n`)

if (city === undefined) {
    console.error("Автоматически назначен город Moscow");
    city = 'Moscow'
}

const url = `${config.url}?access_key=${key}&query=${city}`;


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




const request = require('request')
const dotenv = require('dotenv').config()

const address = process.argv[2]

const url = `https://api.openweathermap.org/data/2.5/weather?q=${address}&units=imperial&appid=${process.env.API_KEY}`

if (!address){
  return console.log('Please enter: city, country')
}

request(url, (error, response, body) => {
  const data = JSON.parse(body)
  console.log(`It's currently ${data.main.temp} outside.`)
})
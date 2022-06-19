if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const WEATHER_API_KEY = process.env.WEATHER_API_KEY
const express = require('express')
const app = express()
app.use(express.static("public"))
app.use(express.json())

app.set('view engine', 'ejs')

const request = require('request');
const dotenv = require('dotenv').config()

app.route("/weather")
/*
  .get((req,res) => {
    res.render('index.ejs')
  })
  */
  .post((req,res) => {
    console.log(req.body)
 
    let address = req.body.address
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${address}&units=imperial&appid=${process.env.WEATHER_API_KEY}`
    if (!address){
      res.render('index.ejs', {address: req.body.address, temp: ''})
    } else {
      request(url, (error, response, body) => {
        const data = JSON.parse(body)
        res.render('index.ejs', {address: req.body.address, temp: data.main.temp})
      })
    } 
})


app.listen(3000, () => {
  console.log('Server Started')
})
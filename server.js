const express = require('express')
const bodyParser= require('body-parser')
const app = express()

app.use(bodyParser.urlencoded({extended: true}))
app.set('view engine', 'ejs')

const MongoClient = require('mongodb').MongoClient

var db = null

MongoClient.connect('mongodb://owner:tahFah7x@eg-mongodb/jmht001', (err, client) => {
  if (err) return console.log(err)
  db = client.db('jmht001')
  app.listen(3000, () => {
    console.log('listening on 3000')
  })
})

app.get('/', (req, res) => {
  db.collection('projects').find().toArray((err, result) => {
    if (err) return console.log(err)
    // renders index.ejs
    res.render('index.ejs', {projects: result})
  })
})

app.post('/projects', (req, res) => {
  db.collection('projects').save(req.body, (err, result) => {
    if (err) return console.log(err)

    console.log('saved to database')
    res.redirect('/')
  })
})

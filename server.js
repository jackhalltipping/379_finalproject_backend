const express = require('express')
const bodyParser= require('body-parser')
const app = express()

app.use(bodyParser.urlencoded({extended: true}))
app.set('view engine', 'ejs')

const MongoClient = require('mongodb').MongoClient

var db = null

MongoClient.connect('mongodb://admin:password@18.191.29.110/projectDB', (err, client) => {
  if (err) return console.log(err)
  db = client.db('projectDB')
  app.listen(process.env.PORT || 3000, function(){
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
  });
})

app.get('/', (req, res) => {
  //return whole JSON database
  db.collection('projects').find().toArray((err, result) => {
    if (err) return console.log(err)
    console.log(result)
    //res.render('index.ejs', {projects: result})
    res.send(result)
  })
  // db.collection("projects").findOne({"pin":"123"}, function(err, result) {
  //   if (err) throw err;
  //   console.log(result);
  // });
  //console.log(db.collection('projects').find())
})

// app.get('/:pin', (req, res) => {
//   //get specific pin
//   //console.log(db.collection('projects').find({"pin": "123"}))
//   db.collection("projects").findOne({"pin":"123"}, function(err, result) {
//     if (err) throw err
//     console.log(result)
//     res.send(result)
//   });
//   console.log('getting specific pin')
// })

app.get('/:pin', function (req, res) {
  //res.send(req.params)
  db.collection("projects").findOne(req.params, function(err, result) {
    if (err) throw err
    console.log(result)
    res.send(result)
  });
})

app.post('/projects', (req, res) => {
  db.collection('projects').save(req.body, (err, result) => {
    if (err) return console.log(err)

    console.log('saved to database')
    res.redirect('/')
  })
})

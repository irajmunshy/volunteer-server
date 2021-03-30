const express = require('express');
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;
const { reset } = require('nodemon');
require('dotenv').config()

const app = express()
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.xrnpv.mongodb.net/${process.env.DB_USER}?retryWrites=true&w=majority1`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(cors());
app.use(express.json());
app.get('/', (req, res) => {
    res.send('Hello World!');
})


client.connect(err => {
    const eventCollection = client.db("volunteer").collection("events");
  
    app.post('/addEvent', (req, res) => {
        const newEvent = req.body;
        eventCollection.insertOne(newEvent)
        .then(result => {
            res.send(result.insertedCount);
        })
    })

    app.get('/userInfo', (req, res) => {
        eventCollection.find({})
        .toArray((err, document) => {
            res.send(document);
        })
    })

  //   client.close();
});

app.listen(process.env.PORT || 4000);
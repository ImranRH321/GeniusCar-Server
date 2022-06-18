const express = require('express');
var cors = require('cors')
require('dotenv').config()
const { MongoClient, ServerApiVersion } = require('mongodb');
const ObjectId = require('mongodb').ObjectId
const port = process.env.PORT || 5000
const app = express()

// middleware 
app.use(cors())
app.use(express.json())



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.fe8tu.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run () {
 try{
     await client.connect()
     const serviceCollection = client.db('geniusCar').collection('service')
     
     app.get('/service', async (req, res) => {
        const query = {};
        const result = await serviceCollection.find(query)
       const services = await result.toArray()
        res.send(services)
     })

     app.get('/service/:id', async (req, res) => {
        const id = req.params.id
        const query = {_id: ObjectId(id)}
        const service = await serviceCollection.findOne(query)
        res.send(service)
     })

     app.post('/service', async (req, res) => {
       const addService = req.body 
        const service = await serviceCollection.insertOne(addService)
        res.send(service)
     })
      
   app.delete('/service/:id', async (req, res)=> {
     const id = req.params.id
     const query = {_id: ObjectId(id)}
     const result = await serviceCollection.deleteOne(query)
     console.log(result);
     res.send(result)
   })

 }
  finally{

  }
}

run().catch(console.dir)


app.get('/', (req, res) => {
    res.send('Genius car Server is Running !')
})

app.listen(port, () => {
    console.log('server is running port ', port);
})


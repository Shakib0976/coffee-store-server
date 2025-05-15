const express = require('express');
const cors = require('cors');
require('dotenv').config()
const app = express();
const port = process.env.PORT || 3000;
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');


app.use(cors());
app.use(express.json());



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@clustershakibwebcraft.lm1t8cs.mongodb.net/?retryWrites=true&w=majority&appName=ClusterShakibWebCraft`;

// const uri = "mongodb+srv://<db_username>:<db_password>@clustershakibwebcraft.lm1t8cs.mongodb.net/?retryWrites=true&w=majority&appName=ClusterShakibWebCraft";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();




        const coffeeCollections = client.db('coffeeDB').collection('coffees')

        // all coffe get databse to server

        app.get('/coffees', async (req, res) => {

            //    const cursor =coffeeCollections.find();
            //    const result =await cursor.toArray();
            const result = await coffeeCollections.find().toArray();
            res.send(result);


        })





        // coffee add server
        app.post('/coffees', async (req, res) => {
            const coffees = req.body;
            const result = await coffeeCollections.insertOne(coffees)
            res.send(result)
        })

        // delete to data base with ui
        app.delete('/coffees/:id', async (req, res) => {
            const id = req.params.id
            const query = { _id: new ObjectId(id) }
            const result = await coffeeCollections.deleteOne(query);
            res.send(result)
        })




        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);




app.get('/', (req, res) => {
    res.send('hello world')
})

app.listen(port, () => {
    console.log(`coffee store server running port : ${port}`);
})
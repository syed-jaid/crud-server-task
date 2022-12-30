const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
require("dotenv").config();
const port = process.env.PORT || 5000;
const app = express();

// used Middleware
app.use(cors());
app.use(express.json());

// Connact With MongoDb Database
const uri = "mongodb+srv://rolex:VgygYMi2dIoYSpC8@alldata.xfh2r7v.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

// Create a async fucntion to all others activity
async function run() {
    try {
        await client.connect();
        // Create Database to store Data
        const userCollection = client.db("Allusers").collection("info");
        const infoCollection = client.db("Allusers").collection("userinfo");

        app.get("/selectingdata", async (req, res) => {
            const query = {};
            const findData = userCollection.find(query);
            const result = await findData.toArray(); // you can also set skip & limit range dynamicly.
            res.send(result);
        });

        app.get("/userinfo/:id", async (req, res) => {
            const id = req.params.id;
            const result = await infoCollection.find({ _id: ObjectId(id) }).toArray();
            res.send(result);
        });


        app.put("/userinfo/:id", async (req, res) => {
            const id = req.params.id;
            const info = req.body;
            console.log(info)
            const result = await infoCollection.updateOne(
                { _id: ObjectId(id) }, // Find Data by query many time query type is "_id: id" Cheack on database
                {
                    $set: info,
                },
                { upsert: true } // define work
            );
            res.send({ result });
        });

        app.post("/saveinfo", async (req, res) => {
            const user = req.body;
            console.log(user)
            const result = await infoCollection.insertOne(user);
            res.send(result);
        });

    } finally {
    }
}
run().catch(console.dir);

// Root Api to cheack activity
app.get("/", (req, res) => {
    res.send("Hello From SJ Computers!");
});

app.listen(port, () => {
    console.log(`SJ Computers listening on port ${port}`);
});


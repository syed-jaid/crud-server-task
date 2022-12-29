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
client.connect(err => {
    const collection = client.db("test").collection("devices");
    // perform actions on the collection object
    client.close();
});


// Create a async fucntion to all others activity
async function run() {
    try {
        await client.connect();
        // Create Database to store Data
        const userCollection = client.db("Allusers").collection("info");

        app.get("/selectingdata", async (req, res) => {
            const query = {};
            const findData = userCollection.find(query);
            const result = await findData.toArray(); // you can also set skip & limit range dynamicly.
            res.send(result);
        });

        app.post("/saveinfo", async (req, res) => {
            const user = req.body;
            console.log(user)
            // const result = await userCollection.insertOne(user);
            // res.send(result);
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

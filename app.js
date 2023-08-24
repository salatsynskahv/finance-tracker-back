const express = require("express")
const mongoose = require("mongoose")
require("dotenv").config();

const app = express();
const cors = require('cors');
app.use(express.json())
app.use(cors({}));

const port = process.env.PORT || 3001;
const uri = process.env.MONGODB_CONNECTION_STRING;

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const connection = mongoose.connection;
connection.once("open", () => {
    console.log("MongoDB database connection established")
})

const Category = require("./model/category");
app.get('/allCategories', async (req, res) => {
    await Category.find({}).then(
        (data) => {
            res.send(data)
        })
});


app.get('/items', async (req, res) => {

});

app.post('/items', async  (req, res) => {

});

app.listen(port, () => {
    console.log(`App listening at localhost: ${port}`)
})
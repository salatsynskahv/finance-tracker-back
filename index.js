const express = require("express")
const mongoose = require("mongoose")
require("dotenv").config();
const path = require('path');

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
const UserCategory = require("./model/usercategory");
const e = require("express");
const {response} = require("express");



app.get('/', (req, res) => {
    res.sendFile('index.html', {root: path.join(__dirname, 'public')});
})


app.get('/allCategories', async (req, res) => {
    await Category.find({}).then(
        (data) => {
            res.send(data)
        })
});

app.get('/allUserCategories', async (req, res) => {
    const username = req.query.username;
    console.log(username);
    UserCategory.find({username}).then(
        (data) => {
            res.send(data);
        }
    );
});


app.post('/allUserCategories', async (req, res) => {
    console.log(req.body);
    const newUserCategories = await UserCategory.create(req.body);
    res.send('New User Categories Added');
});

app.get('/items', async (req, res) => {

});

app.post('/items', async (req, res) => {

});

app.post('/newUserCategory', async (req, res) => {
    console.log(JSON.stringify(req.body));
    const filter = {username: req.body.username};
    const newCategoryName = req.body.newCategoryName;
    const update = {
        $push: {categories: {name: newCategoryName}, codes: [], shops: []}
    };

    UserCategory.findOneAndUpdate(filter, update, {new: true}, (error, updatedDocument) => {
        if (error) {
            res.send(error);
        } else {
            res.send(updatedDocument);
        }
    })

});

app.patch('/editUserCategoryCode', async (req, res) => {
    const params = req.body;
    console.log(req.body);
    const filter = {
        username: req.body.username,
        'categories.name': req.body.categoryName
    };

    const update = {
        $set: {
            'categories.$.codes': req.body.codes
        }
    };

    UserCategory.findOneAndUpdate(filter, update, {new: true}, (error, update) => {
        if (error) {
            res.send(error);
        } else {
            console.log(update);
            res.send(update);
        }
    })
});


app.delete('/deleteCategoryById', async (req, res) => {
    const params = req.body;
    console.log(params);

    UserCategory.findOneAndUpdate(
        { username: params.username },
        { $pull: { 'categories':  { name: params.name } }},
        { new: true },
        (error, updatedDoc) => {
            if (error) {
                res.status(500).send(error);
            } else {
                if (updatedDoc) {
                    console.log(updatedDoc);
                    res.send(updatedDoc);
                } else {
                    res.status(404).send('No matching document found.');
                }
            }
        }
    );
});



app.patch('/editUserCategoryShop', async (req, res) => {
    const params = req.body;
    console.log(req.body);
    const filter = {
        username: req.body.username,
        'categories.name': req.body.categoryName
    };

    const update = {
        $set: {
            'categories.$.shops': req.body.shops
        }
    };

    UserCategory.findOneAndUpdate(filter, update, {new: true}, (error, update) => {
        if (error) {
            res.send(error);
        } else {
            console.log(update);
            res.send(update);
        }
    })
});

app.use(express.static('public'));

app.listen(port, () => {
    console.log(`App listening at localhost: ${port}`)
});

module.exports = app;
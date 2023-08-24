const mongoose = require("mongoose")
const findOrCreate = require("mongoose-findorcreate")

const Schema = mongoose.Schema

const categorySchema = new Schema({
    name : {
        type: String
    },
    codes: {
        type: [String]
    }
})

categorySchema.plugin(findOrCreate)
const Category = mongoose.model("category", categorySchema)

module.exports = Category;
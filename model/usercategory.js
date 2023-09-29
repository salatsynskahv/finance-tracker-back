const mongoose = require("mongoose")
const findOrCreate = require("mongoose-findorcreate")

const Schema = mongoose.Schema

const userCategorySchema = new Schema({
    username: {
        type: String
    },
    categories: [{
        name: {
            type: String
        },
        codes: {
            type: [String]
        },
        shops: {
            type: [String]
        }
    }]
})

userCategorySchema.plugin(findOrCreate)
const UserCategory = mongoose.model("userCategory", userCategorySchema)

module.exports = UserCategory;
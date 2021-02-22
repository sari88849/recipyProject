const mongoose = require('mongoose')

const RecipySchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true },
    content: { type: String, required: true },
    link: { type: String },
    image: { type: String }
})

module.exports = mongoose.model('Recipy', RecipySchema)
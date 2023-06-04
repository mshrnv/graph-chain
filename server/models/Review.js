const {Schema, model} = require('mongoose')

const Review = new Schema({
    graphId: {type: String, required: true},
    userId: {type: String, required: true},
    rating: {type: Number, required: true},
    text: {type: String}
})

module.exports = model('Review', Review)
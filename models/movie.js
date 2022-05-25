const mongoose = require('mongoose')



const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        min: 5,
        max: 255,
        required: true
    },
    plot: {
        type: String,
        min: 5,
        max: 255
    },
    genres : [String],
    poster: String,
    cast : [String],
    countries : [String],
    directors : [String],
    rated: String,
    year: Number,
    languages: [String]
});

const Movie = mongoose.model("Movie", movieSchema);

exports.Movie = Movie


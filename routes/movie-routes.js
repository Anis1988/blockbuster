
const {Movie} = require('../models/movie')
const express = require('express');
const routes = express.Router()
const { auth, admin } = require('../middleware/auth');
const { validatorReqParamId } = require('../middleware/validatingObjectId');




routes.get('/',async (req,res) => {
    let movies;
    const pageSize =  req.query.pageSize ? req.query.pageSize : 30
    const pageNumber =  req.query.pageNumber ? req.query.pageNumber : 1
    if (pageSize || pageNumber ){
        movies = await Movie.find()
            .skip((pageNumber - 1)* pageSize)
            .limit(pageSize)
    }
    let mvs = [...movies];
    if (req.query.cast) {
      mvs = await Movie.find({ "cast": req.query.cast });
      if (!mvs || mvs.length === 0)
        return res.send("No movies matching your cast!!");
    }
    if (req.query.genre) {
      mvs = await Movie.find({ "genres": req.query.genre });
      if (!mvs || mvs.length === 0)
        return res.send("No movies matching your genre!!");
    }
    if (req.query.country) {
      mvs = await Movie.find({ "countries": req.query.country });
      if (!mvs || mvs.length === 0)
        return res.send("No movies matching your country!!");
    }
    if (req.query.dir) {
        mvs = await Movie.find({ "directors": req.query.dir });
        if (!mvs || mvs.length === 0)
          return res.send("No movies matching your directors!!");
    }
    if (req.query.lang ) {
        mvs = await Movie.find({ "languages": req.query.lang });
        if (!mvs || mvs.length === 0)
          return res.send("No movies matching your language!!");
    }
    console.log(mvs.length)
    res.send(mvs)
})

routes.get("/:id", [auth, admin, validatorReqParamId], async (req, res) => {
  const movie = await Movie.findById(req.params.id);
  return res.send(movie);
});

routes.post('/', async (req,res) => {
  const movie = await Movie.create({
    title: req.body.title,
    plot: req.body.plot,
    rated: req.body.rated,
    year: req.body.year,
    genres: req.body.genre,
    cast: req.body.cast,
    countries: req.body.country ,
    directors: req.body.director,
    languages: req.body.language,
  });
  res.status(201).send(movie)
})
routes.delete('/:id',validatorReqParamId,async( req,res) => {

      const movie = await Movie.findByIdAndDelete(req.params.id);
      return res.send(movie);
})

routes.put('/:id',validatorReqParamId, (req, res) => {
  Movie.findByIdAndUpdate(
    req.params.id,
    {
       title: req.body.title,
       plot: req.body.plot,
       rated: req.body.rated,
       year: req.body.year,
       genres: req.body.genre,
       cast: req.body.cast,
       countries: req.body.country,
       directors: req.body.director,
       languages: req.body.language, },
    { new: true },
    (err, movieUpdated) => {
      return res.status(200).send(movieUpdated)
    }
  );
});


module.exports = routes;

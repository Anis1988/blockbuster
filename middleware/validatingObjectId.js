
const mongoose = require('mongoose')
const {loggerErrors} = require('./logger')

function validatorReqParamId(req,res,next) {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      loggerErrors.error(`No entity of the given ${req.params.id} in our DB`);
      return res
        .status(404)
        .send(`No entity of the given ${req.params.id} in our DB`);
    }
    next();
}


function validatorReqBodyMovieId(req,res,next) {
    if (!mongoose.Types.ObjectId.isValid(req.body.movieId)) {
      loggerErrors.error(
        `No movie of the given ${req.body.movieId} in our DB`
      );
      return res
        .status(404)
        .send(`No movie of the given ${req.body.movieId} in our DB`);
    }
    next();
}

exports.validatorReqParamId = validatorReqParamId;
exports.validatorReqBodyMovieId = validatorReqBodyMovieId;


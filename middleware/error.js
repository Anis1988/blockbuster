
const {loggerErrors} = require("./logger");

function error(err, req, res, next) {

  loggerErrors.error({
    level: "error",
    message: err.message ? err.message : "Something went Wrong",
  });

   return res.status(500).send(err.message ? err.message : "Something went Wrong");
}

exports.error = error;

const mongoose = require('mongoose')
const {loggerDB} =  require('../middleware/logger')



const connect = (port,url,app) => {
mongoose
  .connect(url)
  .then(() => {
    app.listen(
      port,
      console.log("Mongo is Connected and App is listening on port " + port)
    );
  })
  .catch(() => loggerDB.error("Failed to Connecte to MONGO !"));
}

exports.connect = connect

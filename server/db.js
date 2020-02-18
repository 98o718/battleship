const config = require('./config')
const mongoose = require('mongoose')

const authData = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  connectTimeoutMS: 10000,
  family: 4,
}

mongoose.connect(config.db.url, authData, err => {
  if (err)
    console.log(
      'Error in database connection : ' + JSON.stringify(err, undefined, 2)
    )
})

mongoose.set('useNewUrlParser', true)
mongoose.set('useFindAndModify', false)
mongoose.set('useCreateIndex', true)

module.exports = mongoose

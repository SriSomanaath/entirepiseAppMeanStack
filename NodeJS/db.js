const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/CrudDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('MongoDB connection succeeded');
  })
  .catch((err) => {
    console.log('Error in DB connection: ' + err);
  });

module.exports = mongoose;
  
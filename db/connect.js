const mongoose = require("mongoose");

const connectToDB = (url) => {
  console.log(url);
  return mongoose.connect(url, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: true,
    useUnifiedTopology: true,
  });
};

module.exports = connectToDB;

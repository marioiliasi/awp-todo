const mongoose = require("mongoose");

const uri = 'mongodb://localhost:27017/todo';
module.exports.connect = async () => {
  try {
    console.log(`trying to connect to mongodb - ${uri}`);
    await mongoose.connect(uri, { useNewUrlParser: true });
    console.log(`connected successfully to mongodb`);
  } catch (error) {
    console.log(`failed to connect to mongodb - ${error}`);
  }
};


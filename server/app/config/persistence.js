const mongoose = require("mongoose");

let uri = 'mongodb://mongo:27017/todo';
module.exports.connect = async () => {
  try {
    console.log(`trying to connect to mongodb - ${uri}`);
    await mongoose.connect(uri, { useNewUrlParser: true });
    console.log(`connected successfully to mongodb`);
  } catch (error) {
    console.log(`failed to connect to mongodb on mongo container - ${error}`);
    console.log("trying to connect to 0.0.0.0");
    try {
      uri = 'mongodb://localhost:27017/todo';
      console.log(`trying to connect to mongodb - ${uri}`);
      await mongoose.connect(uri, { useNewUrlParser: true });
      console.log(`connected successfully to mongodb`);
    } catch (error) {
      console.log(`failed to connect to mongodb on localhost - ${error}`);
      throw error;
    }
  }
};


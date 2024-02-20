const mongoose = require('mongoose')
const URI = "mongodb+srv://karishma:karishma11@karishma.cyhxyuz.mongodb.net/ASAP-Project?retryWrites=true&w=majority"

const startDatabase = async () => {
  try {
    await mongoose.connect(URI)
    console.log("connected")
  }catch(err){
    console.log("error",err.message)
  }
};

const stopDatabase = async () => {
  // Your code here
  try {
    await mongoose.disconnect();
    console.log("disconnected")
  }catch(err){
    console.log("error",err.message)
  }
};

const isConnected = () => {
  return mongoose.connection.readyState === 1;
}

module.exports = { startDatabase, stopDatabase, isConnected };

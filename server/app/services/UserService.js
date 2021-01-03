const { User } = require("../models/user");
const jwt = require('jsonwebtoken');

async function getById (id) {
  const user =  await User.findById(id);
  console.log(JSON.stringify(user));
  return user;
}

async function getByEmail (email) {
  const user =  await User.find({
    email: email
  });
  console.log(JSON.stringify(user));
  return user;
}

async function save (body) {
  const foundUser = await this.getByEmail(body.email);
  if(foundUser.length > 0){
    throw new Error("User already exists");
  }
  if(!body.passwordEncrypted)
    body.passwordEncrypted = body.password;
  const user = new User(body);
  const resp = await user.save();
  console.log(JSON.stringify(resp));
  return resp;
}

async function update (id, body){
  const user = new User(body);
  delete user._doc._id;
  const resp = await User.findByIdAndUpdate({_id: id}, user, {});
  console.log(JSON.stringify(resp));
  return resp;
}

async function deleteById(id) {
  const user = await getById(id);
  if(!user){
    throw new Error("No user found for that id");
  }
  user.deleted = true;
  const resp = await User.findByIdAndUpdate({_id: id}, user, {});
  console.log(JSON.stringify(resp));
  return resp;
}

async function authenticate(body) {
  const user = await getByEmail(body.email);
  if(!user || !user.length || !user[0]._doc){
    throw new Error("No user found for that email");
  }
  const userDoc = user[0]._doc;
  if(userDoc.passwordEncrypted === body.password){
    userDoc.token = jwt.sign(body, 'test');
    return userDoc;
  }
  throw new Error("Invalid password");
}

module.exports = {
  getByEmail,
  getById,
  update,
  save,
  deleteById,
  authenticate
};

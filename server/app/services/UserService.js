const { User } = require("../models/user");

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

module.exports = {
  getByEmail,
  getById,
  update,
  save,
  deleteById
};

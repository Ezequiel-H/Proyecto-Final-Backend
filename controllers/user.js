import User from "../models/user.js";

export const createUser = async (req, res) => {
  const user = new User(req.body);
  const newUser = await user.save();
  console.log(newUser);
  res.send(newUser);
};

export const findUsers = async (_, res) => {
  const users = await User.find({});
  console.log(users);
  res.send(users);
};

export const deleteUser = async (req, res) => {
  const users = await User.findOneAndDelete({ _id: req.params.id });
  console.log(users);
  res.send(users);
};

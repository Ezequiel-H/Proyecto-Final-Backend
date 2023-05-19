import User from "../models/user.js";

export const createUser = async (req, res) => {
  const user = new User(req.body);
  const newUser = await user.save();
  res.send(newUser);
};

import User from "../models/user.js";

export const getUserByCriteria = (criteria) =>
  User.findOne(criteria).select({ password: 0 });

export const getUserWithPassword = (email) =>
  User.findOne({ email }).populate("fields");

export const getUserById = (_id) => getUserByCriteria({ _id });

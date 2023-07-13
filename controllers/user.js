import User from "../models/user.js";

import { catchRequest, endRequest } from "../helpers/request.js";
import { getUserByCriteria, getUserWithPassword } from "../interactors/user.js";
import { changeFieldAndSave } from "../helpers/entities.js";
import { entityAlreadyExists, unauthorizedUser } from "../errors.js";
import { bodyToUserMapper, removePassword } from "../mapper/user.js";

export const createUser = async (req, res) => {
  const user = new User(bodyToUserMapper(req.body));

  const exists = await User.findOne({ email: user.email });
  if (exists) {
    return catchRequest({
      err: entityAlreadyExists(`email ${user.email}`, "user", "1002"),
      res,
    });
  }

  return user
    .save()
    .then(() => signIn({ body: { ...user.toObject() } }, res))
    .catch((err) =>
      catchRequest({
        err,
        res,
        message: "Error saving User",
        internalCode: "1003",
      })
    );
};

export const deleteUser = async (req, res) => {
  await User.findOneAndUpdate({ _id: req.user.id }, { isDeleted: true });
  endRequest({ code: 204, res });
};

export const signIn = async (req, res) => {
  const { email, password } = req.body;

  const user = await getUserWithPassword(email);
  if (!user) {
    return createUser(req, res);
  }

  if (user.isDeleted) {
    await changeFieldAndSave(user, "isDeleted", false);
  }

  if (user.password.toString() === password.toString()) {
    res.set("authorization", user._id);

    return endRequest({
      response: { user: removePassword(user._doc) },
      code: 200,
      res,
    });
  } else {
    return catchRequest({
      err: unauthorizedUser("Wrong password", "2005"),
      res,
    });
  }
};

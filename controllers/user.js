import User from "../models/user.js";

import { catchRequest, endRequest } from "../helpers/request.js";
import { getUserWithPassword } from "../interactors/user.js";
import { changeFieldAndSave } from "../helpers/entities.js";
import {
  entityAlreadyExists,
  entityNotFound,
  unauthorizedUser,
} from "../errors.js";
import { bodyToUserMapper, removePassword } from "../mapper/user.js";
import { sendEmail } from "../helpers/email.js";

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
  console.log(req.body);

  const user = await getUserWithPassword(email);
  if (!user) {
    return catchRequest({
      err: entityNotFound(email, "user", 1007),
      res,
    });
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

export const restorePassword = async (req, res) => {
  try {
    const email = req.query.email;

    const user = await getUserWithPassword(email);
    if (!user) {
      return catchRequest({
        err: unauthorizedUser("No user found", "2006"),
        res,
      });
    }
    const emailStatus = sendEmail(email, user._id);
    console.log(emailStatus);

    return endRequest({
      response: emailStatus,
      code: 200,
      res,
    });
  } catch (err) {
    catchRequest({
      err,
      res,
      message: "Error while sending recovery email",
      internalCode: "1005",
    });
  }
};

export const changePassword = async (req, res) => {
  await User.findOneAndUpdate(
    { _id: req.user.id },
    { password: req.body.password }
  );
  endRequest({ code: 204, res });
};

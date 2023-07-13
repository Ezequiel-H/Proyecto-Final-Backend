import { catchRequest } from "../helpers/request.js";
import { getUserById } from "../interactors/user.js";
import { unauthorizedUser } from "../errors.js";

export const authenticate = async (req, res, next) => {
  const authHeader = req.headers[process.env.JWT_HEADER_NAME];

  if (!authHeader) {
    return catchRequest({
      err: unauthorizedUser("No token was set", "2000"),
      res,
    });
  }
  const authSplitted = authHeader.split(" ");
  if (authSplitted[0] !== "Bearer") {
    return catchRequest({
      err: unauthorizedUser("Bad header token", "2001"),
      res,
    });
  }
  const token = authSplitted[1];
  if (!token) {
    return catchRequest({
      err: unauthorizedUser("Bad header token", "2002"),
      res,
    });
  }
  try {
    const user = await getUserById(token);
    if (!user) {
      return catchRequest({
        err: unauthorizedUser("No user found", "2003"),
        res,
      });
    }
    // eslint-disable-next-line require-atomic-updates
    req.user = user;
    return next();
  } catch (error) {
    return catchRequest({ err: error, res, internalCode: "2004" });
  }
};

import jwt from 'jsonwebtoken';
import { createError } from './error.js';

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    return next(createError(401, 'You are not authenticated'));
  }

  jwt.verify(token, process.env.JWT, (err, user, adminUser) => {
    if (err) return next(createError(403, 'Token is not valid'));
    req.user = user;
    req.admin = adminUser;
    next();
  });
};

// verify the user and give him/ her access to delete or update his details
export const verifyUser = (req, res, next) => {
  verifyToken(req, res, next, () => {
    if (req.user.id === req.params.id || req.admin.isAdmin) {
      next();
    } else {
      return next(createError(403, 'You are not authorized'));
    }
  });
};

// verify the admin and give him/ her access to delete or update anything from the DB
export const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, next, () => {
    if (req.admin.isAdmin) {
      next();
    } else {
      return next(createError(403, 'You are not an authorized Admin'));
    }
  });
};

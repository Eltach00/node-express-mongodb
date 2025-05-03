import User from '../models/user.model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const registerUserHandler = (req, res) => {
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      const user = new User({
        email: req.body.email,
        password: hash,
      });
      user
        .save()
        .then((doc) => {
          res.status(201).json({ message: 'User created!', id: doc.id });
        })
        .catch((err) => {
          const error = err?.errors;
          if (error.email) {
            res.status(500).send(error.email.message);
          } else {
            res.status(500).json({ error: err });
          }
        });
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
};

export const loginUserHandler = (req, res) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return authFailed(res);
      }
      comparePassword(req.body.password, user.password)
        .then((result) => {
          if (result) {
            const token = jwt.sign(
              { email: user.email, userId: user._id },
              process.env.JWT_SECRET,
              {
                expiresIn: '1h',
              }
            );
            res.status(200).json({
              token,
              userId: user._id,
              expireIn: 3600,
            });
          } else {
            authFailed(res);
          }
        })
        .catch(() => {
          authFailed(res);
        });
    })
    .catch(() => {
      authFailed(res);
    });
};

function authFailed(res, message = 'Auth failed') {
  res.status(401).json({ message });
}

function comparePassword(plainPassword, hashedPassword): Promise<boolean> {
  return bcrypt.compare(plainPassword, hashedPassword);
}

import express from 'express';
import {
  registerUserHandler,
  loginUserHandler,
} from '../controllers/user.controller.js';

const router = express.Router();

router.post('/register', registerUserHandler);
router.post('/login', loginUserHandler);

export default router;

import express from 'express';
import {
  savePostsHandler,
  getPostsHandler,
  deletePostsHandler,
  putPostsHandler,
} from '../controllers/posts.controller.js';
import { uploadSingle } from '../middlewares/uploads-handler.js';
import { checkAuth } from '../middlewares/check-auth.middleware.js';

const router = express.Router();

router.get('/', checkAuth, getPostsHandler);
router.post('/', checkAuth, uploadSingle, savePostsHandler);
router.delete('/:id', checkAuth, deletePostsHandler);
router.put('/:id', checkAuth, uploadSingle, putPostsHandler);

export default router;

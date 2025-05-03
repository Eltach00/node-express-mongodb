import express from 'express';
import {
  postPostsHandler,
  getPostsHandler,
  deletePostsHandler,
  putPostsHandler,
} from '../controllers/posts.controller.js';
import { uploadSingle } from '../utils/uploads-handler.js';

const router = express.Router();

router.get('/', getPostsHandler);
router.post('/', uploadSingle, postPostsHandler);
router.delete('/:id', deletePostsHandler);
router.put('/:id', uploadSingle, putPostsHandler);

export default router;

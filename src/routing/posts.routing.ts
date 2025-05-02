import express from 'express';
import {
  postPostsHandler,
  getPostsHandler,
  deletePostsHandler,
  patchPostsHandler,
} from '../controllers/posts.controller.js';

const router = express.Router();

router.get('/', getPostsHandler);
router.post('/', postPostsHandler);
router.delete('/:id', deletePostsHandler);
router.put('/:id', patchPostsHandler);

export default router;

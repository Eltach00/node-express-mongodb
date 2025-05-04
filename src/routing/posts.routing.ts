import express from 'express';
import {
  savePostsHandler,
  getPostsHandler,
  deletePostsHandler,
  putPostsHandler,
} from '../controllers/index.js';
import { uploadSingle, checkAuth } from '../middlewares/index.js';

const router = express.Router();

router.get('/', checkAuth, getPostsHandler);
router.post('/', checkAuth, uploadSingle, savePostsHandler);
router.delete('/:id', checkAuth, deletePostsHandler);
router.put('/:id', checkAuth, uploadSingle, putPostsHandler);

export default router;

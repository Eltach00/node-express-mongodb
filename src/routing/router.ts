import express from 'express';
import postsRouter from './posts.routing.js';
import rootRouter from './root.routing.js';

const router = express.Router();

router.use('/api/posts', postsRouter);
router.use('/', rootRouter);

export default router;

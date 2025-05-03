import express from 'express';
import postsRouter from './posts.routing.js';
import rootRouter from './root.routing.js';
import userRoutes from './user.routing.js';

const router = express.Router();

router.use('/api/posts', postsRouter);
router.use('/api/user', userRoutes);
router.use('/', rootRouter);

export default router;

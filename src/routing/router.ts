import express from 'express';
import { postsRouter, rootRouter, userRoutes } from './index.js';

const router = express.Router();

router.use('/api/posts', postsRouter);
router.use('/api/user', userRoutes);
router.use('/', rootRouter);

export default router;

// PACKAGE IMPORTS
import { Router } from 'express';

// VALUE IMPORTS
import gamesRouter from './games.route.js';

// GLOBAL CONSTANTS
const router = Router();

// ROUTES CONFIG
router.use(gamesRouter);

// VALUE EXPORTS
export default router;
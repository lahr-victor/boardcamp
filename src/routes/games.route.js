// PACKAGE IMPORTS
import { Router } from 'express';

// VALUE IMPORTS
import retrieveGames from '../controllers/games.controller.js';

// GLOBAL CONSTANTS
const gamesRouter = Router();

// FUNCTIONS
gamesRouter.get('/games', retrieveGames);

// VALUE EXPORTS
export default gamesRouter;

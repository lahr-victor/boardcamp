// PACKAGE IMPORTS
import { Router } from 'express';

// VALUE IMPORTS
import { retrieveGames, storeGame } from '../controllers/games.controller.js';
import gameSchema from '../schemas/games.schema.js';
import validateSchema from '../middlewares/validateSchema.middleware.js';

// GLOBAL CONSTANTS
const gamesRouter = Router();

// FUNCTIONS
gamesRouter.get('/games', retrieveGames);
gamesRouter.post('/games', validateSchema(gameSchema), storeGame);

// VALUE EXPORTS
export default gamesRouter;

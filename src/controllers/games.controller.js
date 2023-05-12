// VALUE IMPORTS
import { db } from '../database/database.connection.js';

// VALUE EXPORTS
export async function retrieveGames(req, res) {
  try {
    const games = await db.query(`
      SELECT * FROM games;
    `)
    res.send(games.rows);
  } catch (error) {
    res.status(500).send(error.message);
  }
}
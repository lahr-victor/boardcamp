// VALUE IMPORTS
import db from '../database/database.connection.js';

// VALUE EXPORTS
export async function retrieveGames(req, res) {
  try {
    const games = await db.query(`
      SELECT * FROM games;
    `);
    res.send(games.rows);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

export async function storeGame(req, res) {
  const {
    name,
    image,
    stockTotal,
    pricePerDay,
  } = req.body;

  try {
    const games = await db.query(`
      SELECT name FROM games;
    `);
    if (games.rows.find((game) => (game.name === name))) {
      return res.status(409).send('This game is already registered!');
    }

    await db.query(`
      INSERT INTO games (
        name, 
        image, 
        "stockTotal", 
        "pricePerDay"
      )
      VALUES (
        $1,
        $2,
        $3,
        $4
      );
    `, [
      name,
      image,
      stockTotal,
      pricePerDay,
    ]);
    return res.sendStatus(201);
  } catch (error) {
    return res.status(500).send(error.message);
  }
}

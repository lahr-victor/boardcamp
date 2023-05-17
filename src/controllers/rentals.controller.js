// PACKAGE IMPORTS
import dayjs from 'dayjs';

// VALUE IMPORTS
import db from '../database/database.connection.js';

// VALUE EXPORTS
export async function retrieveRentals(req, res) {
  try {
    const rentals = await db.query(`
    SELECT rentals.*, customers.name AS "customerName", games.name AS "gameName" FROM rentals
      JOIN customers ON rentals."customerId" = customers.id
      JOIN games ON rentals."gameId" = games.id;
    `);

    res.send(rentals.rows.map((rental) => ({
      id: rental.id,
      customerId: rental.customerId,
      gameId: rental.gameId,
      rentDate: dayjs(rental.rentDate).format('YYYY-MM-DD'),
      daysRented: rental.daysRented,
      returnDate: rental.returnDate && dayjs(rental.returnDate).format('YYYY-MM-DD'),
      originalPrice: rental.originalPrice,
      delayFee: rental.delayFee,
      customer: {
        id: rental.customerId,
        name: rental.customerName,
      },
      game: {
        id: rental.gameId,
        name: rental.gameName,
      },
    })));
  } catch (error) {
    res.status(500).send(error.message);
  }
}

export async function registerRental(req, res) {
  const {
    customerId,
    gameId,
    daysRented,
  } = req.body;

  try {
    const customer = await db.query(`
      SELECT * FROM customers WHERE id = $1;
    `, [customerId]);
    if (!customer.rows[0]) return res.sendStatus(400);

    const game = await db.query(`
      SELECT * FROM games WHERE id = $1;
    `, [gameId]);
    if (!game.rows[0]) return res.sendStatus(400);

    if (daysRented <= 0) return res.sendStatus(400);

    const rentedGames = await db.query(`
      SELECT * FROM rentals WHERE "gameId" = $1 AND "returnDate" IS NULL;
    `, [gameId]);
    if (game.rows[0].stockTotal < rentedGames.rowCount) return res.sendStatus(400);

    const { pricePerDay } = game.rows[0];

    await db.query(`
      INSERT INTO rentals (
        "customerId",
        "gameId",
        "daysRented",
        "rentDate",
        "originalPrice",
        "returnDate",
        "delayFee"
      )
      VALUES (
        $1,
        $2,
        $3,
        $4,
        $5,
        $6,
        $7
      );
`, [
      customerId,
      gameId,
      daysRented,
      dayjs().format('YYYY-MM-DD'),
      (daysRented * pricePerDay),
      null,
      null,
    ]);
    return res.sendStatus(201);
  } catch (error) {
    return res.status(500).send(error.message);
  }
}

export async function finishRental(req, res) {
  const id = parseInt(req.params.id, 10);
  if (id.isNaN) return res.sendStatus(400);

  try {
    const rental = await db.query(`
      SELECT * FROM rentals WHERE id = $1;
      `, [id]);

    if (!rental.rows[0]) return res.sendStatus(404);

    if (rental.rows[0].returnDate) return res.sendStatus(400);

    const { daysRented, originalPrice, rentDate } = rental.rows[0];

    const currentRentDays = dayjs().diff(dayjs(rentDate), 'days');
    const pricePerDay = (originalPrice / daysRented);

    let delayFee = null;
    if (currentRentDays > daysRented) {
      delayFee = pricePerDay * (currentRentDays - daysRented);
    }

    await db.query(`
    UPDATE rentals 
      SET
        "returnDate" = $1, 
        "delayFee" = $2 
      WHERE id = $3;
  `, [
      dayjs().format('YYYY-MM-DD'),
      delayFee,
      id,
    ]);
    return res.sendStatus(200);
  } catch (error) {
    return res.status(500).send(error.message);
  }
}

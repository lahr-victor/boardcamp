// PACKAGE IMPORTS
import dayjs from 'dayjs';

// VALUE IMPORTS
import db from '../database/database.connection.js';

// VALUE EXPORTS
export default async function retrieveRentals(req, res) {
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

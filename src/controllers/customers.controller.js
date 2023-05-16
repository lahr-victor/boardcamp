// VALUE IMPORTS
import db from '../database/database.connection.js';

// VALUE EXPORTS
export default async function retrieveCustomers(req, res) {
  try {
    const customers = await db.query(`
      SELECT * FROM customers;
    `);
    res.send(customers.rows);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

// VALUE IMPORTS
import db from '../database/database.connection.js';

// VALUE EXPORTS
export async function retrieveCustomers(req, res) {
  try {
    const customers = await db.query(`
      SELECT * FROM customers;
    `);
    res.send(customers.rows);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

export async function retrieveCustomerById(req, res) {
  const id = parseInt(req.params.id, 10);
  if (id.isNaN) return res.sendStatus(400);

  try {
    const customer = await db.query(`
      SELECT * FROM customers WHERE id = $1;
    `, [id]);

    if (!customer.rows[0]) return res.sendStatus(404);

    return res.send(customer.rows[0]);
  } catch (error) {
    return res.status(500).send(error.message);
  }
}

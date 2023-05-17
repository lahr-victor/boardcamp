// PACKAGE IMPORTS
import dayjs from 'dayjs';

// VALUE IMPORTS
import db from '../database/database.connection.js';

// VALUE EXPORTS
export async function retrieveCustomers(req, res) {
  try {
    const customers = await db.query(`
      SELECT * FROM customers;
    `);
    res.send(customers.rows.map((customer) => ({
      ...customer, birthday: dayjs(customer.birthday).format('YYYY-MM-DD'),
    })));
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

    return res.send({ ...customer.rows[0], birthday: dayjs(customer.rows[0].birthday).format('YYYY-MM-DD') });
  } catch (error) {
    return res.status(500).send(error.message);
  }
}

export async function registerCustomer(req, res) {
  const {
    name,
    phone,
    cpf,
    birthday,
  } = req.body;

  try {
    const customers = await db.query(`
      SELECT cpf FROM customers;
    `);
    if (customers.rows.find((customer) => (customer.cpf === cpf))) {
      return res.status(409).send('This customer is already registered!');
    }

    await db.query(`
      INSERT INTO customers (
        name, 
        phone, 
        cpf, 
        birthday
      )
      VALUES (
        $1,
        $2,
        $3,
        $4
      );
    `, [
      name,
      phone,
      cpf,
      birthday,
    ]);
    return res.sendStatus(201);
  } catch (error) {
    return res.status(500).send(error.message);
  }
}

export async function updateCustomer(req, res) {
  const id = parseInt(req.params.id, 10);
  if (id.isNaN) return res.sendStatus(400);

  const {
    name,
    phone,
    cpf,
    birthday,
  } = req.body;

  try {
    const customers = await db.query(`
      SELECT id, cpf FROM customers;
    `);
    if (!customers.rows.find((customer) => ((customer.id === id)))) {
      return res.sendStatus(404);
    }
    if (customers.rows.find((customer) => ((customer.cpf === cpf) && (customer.id !== id)))) {
      return res.status(409).send('This CPF is already registered!');
    }

    await db.query(`
      UPDATE customers 
        SET
          name = $1, 
          phone = $2, 
          cpf = $3, 
          birthday = $4
        WHERE id = $5;
    `, [
      name,
      phone,
      cpf,
      birthday,
      id,
    ]);
    return res.sendStatus(200);
  } catch (error) {
    return res.status(500).send(error.message);
  }
}

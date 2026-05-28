const { createTicket, listTickets } = require("../services/ticket.service");

async function create(req, res, next) {
  try {
    const ticket = await createTicket(req.user.id, req.body);

    res.status(201).json({ ticket });
  } catch (error) {
    next(error);
  }
}

async function list(req, res, next) {
  try {
    const tickets = await listTickets(req.user.id, req.query);

    res.status(200).json({ tickets });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  create,
  list,
};

const {
  createTicketComment,
  createTicket,
  getTicketById,
  listTickets,
  updateTicket,
} = require("../services/ticket.service");

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

async function getById(req, res, next) {
  try {
    const ticket = await getTicketById(req.user.id, req.params.id);

    res.status(200).json({ ticket });
  } catch (error) {
    next(error);
  }
}

async function update(req, res, next) {
  try {
    const ticket = await updateTicket(req.user.id, req.params.id, req.body);

    res.status(200).json({ ticket });
  } catch (error) {
    next(error);
  }
}

async function createComment(req, res, next) {
  try {
    const comment = await createTicketComment(req.user.id, req.params.id, req.body);

    res.status(201).json({ comment });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  create,
  createComment,
  getById,
  list,
  update,
};

const { TicketPriority, TicketStatus } = require("@prisma/client");

const { prisma } = require("../lib/prisma");

const validPriorities = Object.values(TicketPriority);
const validStatuses = Object.values(TicketStatus);

const ticketInclude = {
  user: {
    select: {
      id: true,
      name: true,
      email: true,
    },
  },
  _count: {
    select: {
      comments: true,
    },
  },
};

function notFoundError() {
  const error = new Error("Ticket was not found");
  error.statusCode = 404;
  return error;
}

function normalizePriority(priority) {
  if (!priority) {
    return TicketPriority.MEDIUM;
  }

  const normalizedPriority = priority.trim().toUpperCase();

  if (!validPriorities.includes(normalizedPriority)) {
    const error = new Error("Invalid ticket priority");
    error.statusCode = 400;
    throw error;
  }

  return normalizedPriority;
}

function normalizeStatus(status) {
  if (!status) {
    return undefined;
  }

  const normalizedStatus = status.trim().toUpperCase();

  if (!validStatuses.includes(normalizedStatus)) {
    const error = new Error("Invalid ticket status");
    error.statusCode = 400;
    throw error;
  }

  return normalizedStatus;
}

async function createTicket(userId, { title, description, priority }) {
  if (!title || !description) {
    const error = new Error("Title and description are required");
    error.statusCode = 400;
    throw error;
  }

  return prisma.ticket.create({
    data: {
      title: title.trim(),
      description: description.trim(),
      priority: normalizePriority(priority),
      userId,
    },
    include: ticketInclude,
  });
}

async function listTickets(userId, filters = {}) {
  const status = normalizeStatus(filters.status);
  const priority = filters.priority ? normalizePriority(filters.priority) : undefined;

  return prisma.ticket.findMany({
    where: {
      userId,
      ...(status ? { status } : {}),
      ...(priority ? { priority } : {}),
    },
    orderBy: {
      createdAt: "desc",
    },
    include: ticketInclude,
  });
}

async function getTicketById(userId, ticketId) {
  const ticket = await prisma.ticket.findFirst({
    where: {
      id: ticketId,
      userId,
    },
    include: ticketInclude,
  });

  if (!ticket) {
    throw notFoundError();
  }

  return ticket;
}

async function updateTicket(userId, ticketId, data) {
  await getTicketById(userId, ticketId);

  const updateData = {};

  if (data.title !== undefined) {
    if (!data.title) {
      const error = new Error("Title cannot be empty");
      error.statusCode = 400;
      throw error;
    }

    updateData.title = data.title.trim();
  }

  if (data.description !== undefined) {
    if (!data.description) {
      const error = new Error("Description cannot be empty");
      error.statusCode = 400;
      throw error;
    }

    updateData.description = data.description.trim();
  }

  if (data.priority !== undefined) {
    updateData.priority = normalizePriority(data.priority);
  }

  if (data.status !== undefined) {
    updateData.status = normalizeStatus(data.status);
  }

  if (Object.keys(updateData).length === 0) {
    const error = new Error("No valid fields were provided");
    error.statusCode = 400;
    throw error;
  }

  return prisma.ticket.update({
    where: {
      id: ticketId,
    },
    data: updateData,
    include: ticketInclude,
  });
}

module.exports = {
  createTicket,
  getTicketById,
  listTickets,
  updateTicket,
};

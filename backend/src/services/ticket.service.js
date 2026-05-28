const { TicketPriority, TicketStatus } = require("@prisma/client");

const { prisma } = require("../lib/prisma");

const validPriorities = Object.values(TicketPriority);
const validStatuses = Object.values(TicketStatus);

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
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
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
    include: {
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
    },
  });
}

module.exports = {
  createTicket,
  listTickets,
};

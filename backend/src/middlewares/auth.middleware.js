const jwt = require("jsonwebtoken");

const { prisma } = require("../lib/prisma");
const { sanitizeUser } = require("../services/auth.service");

async function authMiddleware(req, res, next) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      const error = new Error("Authentication token is required");
      error.statusCode = 401;
      throw error;
    }

    if (!process.env.JWT_SECRET) {
      const error = new Error("JWT_SECRET is not configured");
      error.statusCode = 500;
      throw error;
    }

    const token = authHeader.replace("Bearer ", "");
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    const user = await prisma.user.findUnique({
      where: { id: payload.sub },
    });

    if (!user) {
      const error = new Error("Authenticated user was not found");
      error.statusCode = 401;
      throw error;
    }

    req.user = sanitizeUser(user);
    next();
  } catch (error) {
    if (error.name === "JsonWebTokenError" || error.name === "TokenExpiredError") {
      error.statusCode = 401;
      error.message = "Invalid or expired token";
    }

    next(error);
  }
}

module.exports = { authMiddleware };

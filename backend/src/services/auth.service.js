const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { prisma } = require("../lib/prisma");

const SALT_ROUNDS = 10;

function sanitizeUser(user) {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    createdAt: user.createdAt,
  };
}

function signToken(user) {
  return jwt.sign(
    {
      sub: user.id,
      email: user.email,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" },
  );
}

function assertAuthConfig() {
  if (!process.env.JWT_SECRET) {
    const error = new Error("JWT_SECRET is not configured");
    error.statusCode = 500;
    throw error;
  }
}

async function registerUser({ name, email, password }) {
  assertAuthConfig();

  if (!name || !email || !password) {
    const error = new Error("Name, email and password are required");
    error.statusCode = 400;
    throw error;
  }

  const normalizedEmail = email.trim().toLowerCase();
  const existingUser = await prisma.user.findUnique({
    where: { email: normalizedEmail },
  });

  if (existingUser) {
    const error = new Error("Email is already in use");
    error.statusCode = 409;
    throw error;
  }

  const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
  const user = await prisma.user.create({
    data: {
      name: name.trim(),
      email: normalizedEmail,
      password: passwordHash,
    },
  });

  return {
    user: sanitizeUser(user),
    token: signToken(user),
  };
}

async function loginUser({ email, password }) {
  assertAuthConfig();

  if (!email || !password) {
    const error = new Error("Email and password are required");
    error.statusCode = 400;
    throw error;
  }

  const normalizedEmail = email.trim().toLowerCase();
  const user = await prisma.user.findUnique({
    where: { email: normalizedEmail },
  });

  if (!user) {
    const error = new Error("Invalid credentials");
    error.statusCode = 401;
    throw error;
  }

  const passwordMatches = await bcrypt.compare(password, user.password);

  if (!passwordMatches) {
    const error = new Error("Invalid credentials");
    error.statusCode = 401;
    throw error;
  }

  return {
    user: sanitizeUser(user),
    token: signToken(user),
  };
}

module.exports = {
  loginUser,
  registerUser,
  sanitizeUser,
};

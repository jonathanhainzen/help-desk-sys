const { Router } = require("express");

const {
  create,
  createComment,
  getById,
  list,
  update,
} = require("../controllers/ticket.controller");
const { authMiddleware } = require("../middlewares/auth.middleware");

const router = Router();

router.use(authMiddleware);

router.post("/", create);
router.get("/", list);
router.get("/:id", getById);
router.patch("/:id", update);
router.post("/:id/comments", createComment);

module.exports = router;

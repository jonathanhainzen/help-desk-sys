const { Router } = require("express");

const { create, list } = require("../controllers/ticket.controller");
const { authMiddleware } = require("../middlewares/auth.middleware");

const router = Router();

router.use(authMiddleware);

router.post("/", create);
router.get("/", list);

module.exports = router;

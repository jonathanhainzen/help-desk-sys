const { Router } = require("express");

const router = Router();

router.get("/", (req, res) => {
  res.status(200).json({
    status: "ok",
    service: "help-desk-sys-api",
  });
});

module.exports = router;

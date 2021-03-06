const express = require("express");
const router = express.Router();

const controller = require("../controllers/user-controller");

router.get("/", controller.get);
router.post("/auth", controller.getAuth);
router.get("/:id", controller.getById);
router.post("/", controller.post);
router.put("/:id", controller.put);
router.delete("/:id", controller.delete);

module.exports = router;
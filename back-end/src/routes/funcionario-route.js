
const express = require("express");
const router = express.Router();

//inic
const multer = require("multer");
//const upload = multer({dest:"./public/uploads"})

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    //let obj = JSON.parse(req.body.obj);
    cb(null, "./public/uploads/");
  },
  filename: function (req, file, cb) {
    //let obj = JSON.parse(req.body.obj);
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });
//fim

const controller = require("../controllers/funcionario-controller");
//onsole.log();
router.get("/", controller.get);
router.get("/qty", controller.getQty);
router.get("/search", controller.getByCargo);
router.get("/:id", controller.getById);
router.post("/", upload.single("image"),controller.post);
router.put("/:id", upload.single("image"), controller.put);
router.delete("/:id", controller.delete);

module.exports = router;
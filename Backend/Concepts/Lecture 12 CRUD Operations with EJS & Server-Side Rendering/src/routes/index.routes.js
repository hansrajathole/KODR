const { Router } = require("express");
const router = Router();
const controller = require("../controller/index.controller");

router.get("/", controller.indexController);

router.get("/read", controller.readController);

router.post("/create", controller.createController);

router.get("/delete/:id", controller.deleteController);

router.get("/edit/:userId", controller.editController);

router.post("/update/:userId", controller.updateController);

module.exports = router;

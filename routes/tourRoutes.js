const express = require("express");
const tourRouter = require("../controllers/tourControllers");
const router = express.Router();

router.route("/").get(tourRouter.getAllTours).patch(tourRouter.createChannel);
router.route("/create/").post(tourRouter.createTour);

router.route("/:id").patch(tourRouter.updateTour).delete(tourRouter.deleteTour);

module.exports = router;

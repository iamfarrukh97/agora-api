const express = require('express')
const tourRouter = require('../controllers/tourControllers')
const router = express.Router()

router
  .route('/')
  .get(tourRouter.getAllTours)
  .post(tourRouter.createChannel)
router
  .route('/:id')
  .get(tourRouter.getTour)
  .patch(tourRouter.updateTour)
  .delete(tourRouter.deleteTour)
module.exports = router

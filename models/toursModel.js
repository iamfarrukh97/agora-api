const mongoose = require('mongoose')

const tourScheme = new mongoose.Schema({
  name: {
    type: String,
    required: [true, ' A tour must have name'],
    unique: true,
    trim: true,
    maxlength: [
      40,
      'A tour must have less or equal then 40 characters'
    ],
    minlength: [
      10,
      'A tour must have more or equal then 10 characters'
    ]
  },
  slug: String,
  duration: {
    type: Number,
    required: [true, ' A tour must have duration']
  },
  maxGroupSize: {
    type: Number,
    required: [true, ' A tour must have group size']
  },
  difficulty: {
    type: String,
    required: [true, ' A tour must have difficulty'],
    enum: {
      values: ['easy', 'medium', 'difficult'],
      message: 'Difficulty is either : easy, medium, difficult'
    }
  },
  ratingAverage: {
    type: Number,
    default: 4.5,
    max: [5, 'Rating must be less then or equal to 5'],
    min: [1, 'Rating must be greater then or equal to 1']
  },
  ratingQuantity: {
    type: Number,
    default: 0
  },
  price: {
    type: Number,
    required: [true, ' A tour must have price']
  },
  priceDiscount: {
    type: Number,
    validate: {
      // this only working on saving new document, not on updating.
      validator: function (val) {
        return val < this.price
      },
      message: 'Discount price ({VALUE}) is greater then actual price'
    }
  },
  summary: {
    type: String,
    trim: true,
    required: [true, ' A tour must have summery']
  },
  description: {
    type: String,
    trim: true
  },
  imageCover: {
    type: String,
    required: [true, ' A tour must have image cover']
  },
  images: [String],
  createdAt: {
    type: Date,
    default: Date.now(),
    select: false
  },
  startDates: [Date],
  secretTour: {
    type: Boolean,
    default: false
  }
})

const Tour = mongoose.model('Tour', tourScheme)

module.exports = Tour

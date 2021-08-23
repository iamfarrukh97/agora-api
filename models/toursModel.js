const mongoose = require("mongoose");

const tourScheme = new mongoose.Schema({
  tourName: {
    type: String,
    required: [true, " A tour must have name"],
    trim: true,
  },
  tourToken: {
    type: String,
  },
  tourImage: String,
});

const Tour = mongoose.model("Tour", tourScheme);

module.exports = Tour;

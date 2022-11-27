const mongoose = require("mongoose");

const nftSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A NFT muss eine Haben"],
    unique: true,
    trim: true,
  },
  duration: {
    type: String,
    required: [true, "Aktuelle Dauer muss eine Haben"],
  },
  maxGroupSize: {
    type: Number,
    required: [true, "Aktuelle Größe muss eine Gruppe Haben"],
  },

  difficulty: {
    type: String,
    required: [true, "Aktuelle Dauer muss eine Gruppe Haben"],
  },
  ratingsAverage: {
    type: Number,
    default: 0,
  },
  ratingsQuantity: {
    type: Number,
    default: 0,
  },
  price: {
    type: Number,
    required: [true, "A NFT muss ein Preis haben"],
  },
  priceDiscount: Number,
  summary: {
    type: String,
    required:[true, "A NFT muss provide the summary"],
    trim: true,
  },
  Description: {
    type: String,
    trim: true,
  },
  imageCover: {
    type: String,
    trim: true,
    required:[true, "A NFT muss provide the image cover"]
  },
  images: [String],
  createdAt: {
    type: Date,
    default: Date.now()
  },
  startDates:[Date],
});

const NFT = mongoose.model("NFT", nftSchema);

module.exports = NFT;
const mongoose = require("mongoose");

const nftSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A NFT muss eine Haben"],
    unique: true,
  },
  rating: {
    type: Number,
    default: 0,
  },
  price: {
    type: Number,
    required: [true, "A NFT muss ein Preis haben"],
  },
});

const NFT = mongoose.model("NFT", nftSchema);

module.exports = NFT;
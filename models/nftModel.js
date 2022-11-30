const mongoose = require("mongoose");
const slugify = require("slugify");

const nftSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "A NFT muss eine Haben"],
      unique: true,
      trim: true,
    },
    slug: String,
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
      required: [true, "A NFT muss provide the summary"],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    imageCover: {
      type: String,
      trim: true,
      required: [true, "A NFT muss provide the image cover"],
    },
    images: [String],
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false,
    },
    startDates: [Date],
    secretNfts: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virutals: true },
  }
);

nftSchema.virtual("durationWeeks").get(function () {
  return this.duration / 7;
});
//mongoose middleware

//Document middleware: runs before .save() or create()
nftSchema.pre("save", function (next) {
  // console.log(this);
  this.slug = slugify(this.name, { lower: true });
  next();
});

// nftSchema.pre("save", function (next) {
//   console.log("document se esta guardando o se guardo como a ti te guste");
//   next();
// });

// nftSchema.post("save", function (doc, next) {
//   console.log(doc);
//   next();
// });

//QUERY middleware
///---PRE
nftSchema.pre(/^find/, function (next) {
  this.find({ secretNfts: { $ne: true } });
  this.start = Date.now();

  next();
});

// nftSchema.pre("findOne", function (next) {
//   this.find({ secretNfts: { $ne: true } });
//   next();
// });

//QUERY middleware
///---POST
nftSchema.post(/^find/, function (doc, next) {
  console.log(`QUERY TOOK TIME: ${Date.now() - this.start} times`);
 // console.log(doc);
  next();
});
const NFT = mongoose.model("NFT", nftSchema);

module.exports = NFT;

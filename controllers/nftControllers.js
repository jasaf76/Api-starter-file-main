///-----Part 3

const NFT = require("./../models/nftModel");
const APIFeatures = require("./../utils/apiFeatures")
// class APIFeatures {
//   constructor(query, queryString) {
//     this.query = query;
//     this.queryString = queryString;
//   }

//   filter() {
//     //BUILD QUERY
//     const queryObj = { ...this.queryString };
//     const excludedFields = ["page", "sort", "limit", "fields"];
//     excludedFields.forEach((el) => delete queryObj[el]);

//     //ADVANCE FILTERING QUERY
//     let queryStr = JSON.stringify(queryObj);
//     queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
//     this.query = this.query.find(JSON.parse(queryStr));
//     return this;
//   }

//   sort() {
//     if (this.queryString.sort) {
//       const sortBy = this.queryString.sort.split(",").join(" ");
//       console.log(sortBy);
//       this.query = this.query.sort(sortBy);
//     } else {
//       this.query = this.query.sort("-createdAt");
//     }
//     return this;
//   }

//   limitFields() {
//     if (this.queryString.fields) {
//       const fields = this.queryString.fields.split(",").join(" ");
//       this.query = this.query.select(fields);
//     } else {
//       this.query = this.query.select("-__v");
//     }
//     return this;
//   }

//   pagination() {
//     const page = this.queryString.page * 1 || 1;
//     const limit = this.queryString.limit * 1 || 10;
//     const skip = (page - 1) * limit;

//     this.query = this.query.skip(skip).limit(limit);

//     return this;
//   }
// }

exports.aliasTopNFTs = (req, res, next) => {
  req.query.limit = "5";
  req.query.sort = "-ratingsAverage,price";
  req.query.fields = "name,price,ratingsAverage, difficulty";
  next();
};

exports.getAllNfts = async (req, res) => {
  try {
    // // BUILD QUERY
    const features = new APIFeatures(NFT.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .pagination();

    // console.log(JSON.stringify(features));
    const nfts = await features.query;

    //SEND QUERY
    res.status(200).json({
      status: "OK",
      results: nfts.length,
      data: {
        nfts,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error,
    });
  }
};

//Post method
exports.createNFT = async (req, res) => {
  //  const newNFT = new NFT({})
  //    newNFT.save()
  try {
    const newNFT = await NFT.create(req.body);
    res.status(201).json({
      status: "OK",
      data: {
        nft: newNFT,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "Invalid data send for NFT",
      message: error,
    });
  }
};

//Get Single nft
exports.getSingleNFT = async (req, res) => {
  try {
    const nft = await NFT.findById(req.params.id);
    res.status(200).json({
      status: "OK",
      data: {
        nft,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "Invalid data send for NFT",
      message: error,
    });
  }
};

// Patch Method
exports.updateNFT = async (req, res) => {
  try {
    const nft = await NFT.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: "OK",
      data: {
        nft,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "Invalid data send for NFT",
      message: error,
    });
  }
};

// Delet Method
exports.deleteNFT = async (req, res) => {
  try {
    await NFT.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: "OK",
      data: null,
    });
  } catch (error) {
    res.status(404).json({
      status: "Invalid data delete for NFT",
      message: error,
    });
  }
};

///-----Part 3

const NFT = require("./../models/nftModel");
const APIFeatures = require("./../utils/apiFeatures");

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

//Aggregation PIPELINE

exports.getNFTsStats = async (req, res) => {
  try {
    const stats = await NFT.aggregate([
      {
        $match: {
          ratingsAverage: { $gte: 4.5 },
        },
      },
      {
        $group: {
          _id: { $toUpper: "$difficulty" },
          // _id:"$ratingsAverage",
          numNFT: { $sum: 1 },
          numRatings: { $sum: "$ratingsQuantity" },
          avgRating: { $avg: "$ratingsAverage" },
          avgPrice: { $avg: "$price" },
          minPrice: { $min: "$price" },
          maxPrice: { $max: "$price" },
        },
      },
      {
        $sort: { avgRating: 1 },
      },
      {
        $match: {
          _id: { $ne: " EASY" },
        },
      },
    ]);
    res.status(200).json({
      status: "OK",
      data: {
        stats,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "Invalid data send for NFT",
      message: error,
    });
  }
};

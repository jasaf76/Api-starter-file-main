///-----Part 2

const NFT = require("./../models/nftModel");

exports.getAllNfts = async (req, res) => {
  // console.log(req.requestTime);
  console.log(req.query)

  try {
    const nfts = await NFT.find();
    res.status(200).json({
      status: "OK",
      results: nfts.length,
      data: {
        nfts: nfts,
      },
    });
  } catch (error) {
    res.status(500).json({
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

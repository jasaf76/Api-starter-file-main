const express = require("express");
const nftControllers = require("./../controllers/nftControllers");

// const {getAllNfts,getSingleNFT,createNFT,updateNFT,deleteNFT} = require("./../controllers/nftControllers");
const router = express.Router();
//router.param("id", nftControllers.checkId);
const NFT = require("./../models/nftModel")

//TOP % NFTs by PRICE
router
  .route("/top-5-nfts")
  .get(nftControllers.aliasTopNFTs, nftControllers.getAllNfts); 

// ROUTER NFTs
router
  .route("/")
  .get(nftControllers.getAllNfts)
  // .post(nftControllers.checkBody, nftControllers.createNFT);
  .post(nftControllers.createNFT);
  
router
  .route("/:id")
  .get(nftControllers.getSingleNFT)
  .patch(nftControllers.updateNFT)
  .delete(nftControllers.deleteNFT);

module.exports = router;

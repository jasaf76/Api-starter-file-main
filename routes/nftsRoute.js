const express = require('express');
const fs = require("fs");
//Get request
const nfts = JSON.parse(
  fs.readFileSync(`${__dirname}/../nft-data/data/nft-simple.json`, "utf-8")
);


const getAllNfts = (req, res) => {
  console.log(req.requestTime);
  res.status(200).json({
    status: "OK",
    requestTime: req.requestTime,
    results: nfts.length,
    data: {
      nfts: nfts,
    },
  });
};

//Post method
const createNFT = (req, res) => {
  //console.log(req.body)
  //console.log(req)
  const newId = nfts[nfts.length - 1].id + 1;
  const newNFTs = Object.assign({ id: newId }, req.body);
  nfts.push(newNFTs);

  fs.writeFile(
    `${__dirname}/nft-data/data/nft-simple.json`,
    JSON.stringify(nfts),
    (err) => {
      res.status(201).json({
        status: "OK",
        nft: newNFTs,
      });
    }
  );
  //  res.send("post nft");
};

//Get Single nft
const getSingleNFT = (req, res) => {
  //console.log(req.params);
  const id = req.params.id * 1;
  const nft = nfts.find((el) => el.id === id);
  if (id > nfts.length) {
    //if (!nft){
    return res.status(404).json({
      status: "Failed to find",
      message: "Invalid id",
    });
  }

  res.status(200).json({
    status: "OK",
    data: {
      nft,
    },
  });
};

// Patch Method
const updateNFT = (req, res) => {
  if (req.params.id * 1 > nfts.length) {
    return res.status(404).json({
      status: "Failed to find",
      message: "Invalid id",
    });
  }

  res.status(200).json({
    status: "OK",
    data: {
      nft: "Updating",
    },
  });
};

// Delet Method
const deleteNFT = (req, res) => {
  if (req.params.id * 1 > nfts.length) {
    return res.status(404).json({
      status: "Failed to find",
      message: "Invalid id",
    });
  }

  res.status(204).json({
    status: "OK",
    data: null,
  });
};
const router = express.Router();

//ROUTER NFTs
router.route("/").get(getAllNfts).post(createNFT);
router.route("/:id").get(getSingleNFT).patch(updateNFT).delete(deleteNFT);

module.exports = router;
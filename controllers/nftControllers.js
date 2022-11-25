const fs = require("fs");
//Get request
const nfts = JSON.parse(
  fs.readFileSync(`${__dirname}/../nft-data/data/nft-simple.json`, "utf-8")
);

exports.checkId = (req, res, next, value) => {
  console.log(`ID: ${value}`);
  if (req.params.id * 1 > nfts.length) {
    return res.status(404).json({
      status: "Failed to find",
      message: "Invalid id",
    });
  }
  next();
};

exports.checkBody = (req, res, next) => {
  if (!req.body.name || !req.body.price) {
    return res.status(400).json({
      status: "fail",
      message: "Missing name and price",
    });
  }
  next();
};

exports.getAllNfts = (req, res) => {
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
exports.createNFT = (req, res) => {
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
exports.getSingleNFT = (req, res) => {
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
exports.updateNFT = (req, res) => {
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
exports.deleteNFT = (req, res) => {
  res.status(204).json({
    status: "OK",
    data: null,
  });
};

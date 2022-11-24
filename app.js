// const express = require("express");
// const fs = require("fs");

// const app = express();
// app.use(express.json());

// // app.get('/', (req, res) => {
// //   res.status(200).json({message:'Hello World!',api:'NFT Marketplace'})
// // })

// // app.post('/', (req, res) => {
// //   res.status(201).json({message:'Hello World!',api:'NFT Marketplace44444444'})
// // })

// //Get request
// const nfts = JSON.parse(
//   fs.readFileSync(`${__dirname}/nft-data/data/nft-simple.json`, "utf-8")
// );
// //console.log(nfts);
// app.get("/api/v1/nfts", (req, res) => {
//   res.status(200).json({
//     status: "OK",
//     results: nfts.length,
//     data: {
//       nfts: nfts,
//     },
//   });
// });
// //Post method

// app.post("/api/v1/nfts", (req, res) => {
//   //console.log(req.body)
//   //console.log(req)
//   const newId = nfts[nfts.length - 1].id + 1;
//   const newNFTs = Object.assign({ id: newId }, req.body);
//   nfts.push(newNFTs);

//   fs.writeFile(
//     `${__dirname}/nft-data/data/nft-simple.json`,
//     JSON.stringify(nfts),
//     (err) => {
//       res.status(201).json({
//         status: "OK",
//         nft: newNFTs,
//       });
//     }
//   );
//   //  res.send("post nft");
// });

// //Get Single nft

// app.get("/api/v1/nfts/:id", (req, res) => {
//   //console.log(req.params);
//   const id = req.params.id * 1;
//   const nft = nfts.find((el) => el.id === id);
//   if (id > nfts.length) {
//     //if (!nft){
//     return res.status(404).json({
//       status: "Failed to find",
//       message: "Invalid id",
//     });
//   }

//   res.status(200).json({
//     status: "OK",
//     data: {
//       nft,
//     },
//   });
// });
// // Patch Method

// app.patch("/api/v1/nfts/:id", (req, res) => {
//   if (req.params.id * 1 > nfts.length) {
//     return res.status(404).json({
//       status: "Failed to find",
//       message: "Invalid id",
//     });
//   }

//   res.status(200).json({
//     status: 'OK',
//     data: {
//       nft:'Updating'
//     }
//   });
// })

// // Delet Method

// app.delete("/api/v1/nfts/:id", (req, res) => {
//   if (req.params.id * 1 > nfts.length) {
//     return res.status(404).json({
//       status: "Failed to find",
//       message: "Invalid id",
//     });
//   }

//   res.status(204).json({
//     status: "OK",
//     data:null,
//   });
// });

// const port = 3003;
// app.listen(port, () => {
//   console.log(`Server läuft in Port ${port}`);
// });


///Part 2

const express = require("express");
const fs = require("fs");

const app = express();
app.use(express.json());

//Get request
const nfts = JSON.parse(
  fs.readFileSync(`${__dirname}/nft-data/data/nft-simple.json`, "utf-8")
);

const getAllNfts = (req, res) => {
  res.status(200).json({
    status: "OK",
    results: nfts.length,
    data: {
      nfts: nfts,
    },
  });
}
app.get("/api/v1/nfts", getAllNfts);

//Post method

app.post("/api/v1/nfts", (req, res) => {
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
});

//Get Single nft

app.get("/api/v1/nfts/:id", (req, res) => {
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
});
// Patch Method

app.patch("/api/v1/nfts/:id", (req, res) => {
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
});

// Delet Method

app.delete("/api/v1/nfts/:id", (req, res) => {
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
});

const port = 3003;
app.listen(port, () => {
  console.log(`Server läuft in Port ${port}`);
});


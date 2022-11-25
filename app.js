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

///PART 2

// const express = require("express");
// const fs = require("fs");
// const morgan = require("morgan");

// const app = express();
// app.use(express.json());
// app.use(morgan("dev"));
// //Custom Middleware

// app.use((req, res, next) => {
//   // res.header("Access-Control-Allow-Origin", "*");
//   // res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });
// app.use((req, res, next) => {
//   req.requestTime = new Date().toISOString();
//   next();
// });

// //Get request
// const nfts = JSON.parse(
//   fs.readFileSync(`${__dirname}/nft-data/data/nft-simple.json`, "utf-8")
// );

// const getAllNfts = (req, res) => {
//   console.log(req.requestTime);
//   res.status(200).json({
//     status: "OK",
//     requestTime: req.requestTime,
//     results: nfts.length,
//     data: {
//       nfts: nfts,
//     },
//   });
// };

// //Post method
// const createNFT = (req, res) => {
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
// };

// //Get Single nft
// const getSingleNFT = (req, res) => {
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
// };

// // Patch Method
// const updateNFT = (req, res) => {
//   if (req.params.id * 1 > nfts.length) {
//     return res.status(404).json({
//       status: "Failed to find",
//       message: "Invalid id",
//     });
//   }

//   res.status(200).json({
//     status: "OK",
//     data: {
//       nft: "Updating",
//     },
//   });
// };

// // Delet Method
// const deleteNFT = (req, res) => {
//   if (req.params.id * 1 > nfts.length) {
//     return res.status(404).json({
//       status: "Failed to find",
//       message: "Invalid id",
//     });
//   }

//   res.status(204).json({
//     status: "OK",
//     data: null,
//   });
// };

// // app.get("/api/v1/nfts", getAllNfts);
// // app.post("/api/v1/nfts", createNFT);
// // app.get("/api/v1/nfts/:id", getSingleNFT);
// // app.delete("/api/v1/nfts/:id", deleteNFT);
// // app.patch("/api/v1/nfts/:id", updateNFT);

// ///---USERS
// const getAllUsers = (req, res) => {
//   res.status(500).json({
//     status: "error",
//     message: "Internal Server Error",
//   });
// };
// const createUsers = (req, res) => {
//   res.status(500).json({
//     status: "error",
//     message: "Internal Server Error",
//   });
// };
// const getSingleUser = (req, res) => {
//   res.status(500).json({
//     status: "error",
//     message: "Internal Server Error",
//   });
// };
// const updateUser = (req, res) => {
//   res.status(500).json({
//     status: "error",
//     message: "Internal Server Error",
//   });
// };
// const deleteUser = (req, res) => {
//   res.status(500).json({
//     status: "error",
//     message: "Internal Server Error",
//   });
// };

// const nftsRouter = express.Router();
// const usersRouter = express.Router();

// //ROUTER NFTs
// nftsRouter.route("/").get(getAllNfts).post(createNFT);
// nftsRouter
//   .route("/:id")
//   .get(getSingleNFT)
//   .patch(updateNFT)
//   .delete(deleteNFT);
// //ROUTER UsenftsRouter
// usersRouter.route("/").get(getAllUsers).post(createUsers);
// usersRouter
//   .route("/:id")
//   .get(getSingleUser)
//   .patch(updateUser)
//   .delete(deleteUser);
// app.use("/api/v1/nfts", nftsRouter);
// app.use("/api/v1/users", usersRouter);
// const port = 3003;
// app.listen(port, () => {
//   console.log(`Server läuft in Port ${port}`);
// });


///PART 4

const express = require("express");
const morgan = require("morgan");

const nftsRouter = require('./routes/nftsRoute')

const usersRouter = require('./routes/usersRoute')

const app = express();
app.use(express.json());
app.use(morgan("dev"));
//Custom Middleware

app.use((req, res, next) => {
  // res.header("Access-Control-Allow-Origin", "*");
  // res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});
//ROUTER NFTs

app.use("/api/v1/nfts", nftsRouter);
app.use("/api/v1/users", usersRouter);

const port = 3003;
app.listen(port, () => {
  console.log(`Server läuft in Port ${port}`);
});

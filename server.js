const dotenv = require("dotenv");
const app = require("./app");
const mongoose = require("mongoose");
// console.log(app.get("env"))

dotenv.config({ path: "./config.env" });

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);
mongoose
  .connect(DB, {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
  })
  .then((con) => {
    // console.log(con.connection);
    console.log("DB Connection Successfully");
  });
console.log(process.env.NODE_ENV)



// const testNFT = new NFT({
//   name: 'NFT5',
//   rating: 1.3,
//   price: 180,
// });

// testNFT.save().then((docNFT) => {
//   console.log(docNFT);
  
// }).catch (error => {
//   console.log("ERROR: " + error.message)
// })
// //console.log(process.env)
const port = process.env.PORT || 3003;
app.listen(port, () => {
  console.log(`Server läuft in Port ${port}`);
});

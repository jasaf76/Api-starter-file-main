const express = require("express");
const fileUpload = require("express-fileupload");
const rateLimit = require("express-rate-limit");
const morgan = require("morgan");
const AppError = require("./utils/AppError");
const globalErrorHandler = require("./controllers/errorController");
const helmet = require("helmet");
const nftsRouter = require("./routes/nftsRoute");

const usersRouter = require("./routes/usersRoute");

const app = express();
app.use(express.json({ limit: "10kb"}));
//SET SECURITY HTTP HEADERS
app.use(helmet());
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "./tmp",
  })
);

//GLOBAL MIDDLEWARES
//LIMIT REQUEST FROM SAME API
// if (process.env.NODE_ENV === 'development') {
//   app.use(morgan("dev"));
// }

const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message:
    "Zu viele Anfragen von dieser IP, bitte versuchen Sie es in einer Stunde erneut!",
});

app.use("/api", limiter);

app.use(morgan("dev"));
//SERVING TEMPLATE DEMO
app.use(express.static(`${__dirname}/nft-data/img`));

//Custom Middleware
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  // res.header("Access-Control-Allow-Origin", "*");
  // res.header(
  //    "Access-Control-Allow-Headers",
  // //   "Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method"
  // );
  // // res.header(
  // //   "Access-Control-Allow-Methods",
  // //   "GET, POST, PUT,OPTIONS,DELETE,UPDATE,PATCH"
  // // );
  // res.header("Allow", "GET, POST, PUT,OPTIONS,DELETE,UPDATE,PATCH");

  console.log("salio bien la cosa 🐶");
  //console.log(req.headers);
  next();
});
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});
//ROUTER NFTs

app.use("/api/v1/nfts", nftsRouter);
app.use("/api/v1/users", usersRouter);
///--ERROR SECTION
app.all("*", (req, res, next) => {
  // res.status(404).json({
  //   status: "fail",
  //   message: `Es kann nicht  ${req.originalUrl} gefunden werden von dieser Server`,
  // });
  next(
    new AppError(
      `Es kann nicht  ${req.originalUrl} gefunden werden von dieser Server`,
      404
    )
  );
});
///--Global error handel
app.use(globalErrorHandler);
module.exports = app;

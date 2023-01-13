const express = require("express");
const fileUpload = require("express-fileupload");
const rateLimit = require("express-rate-limit");
const morgan = require("morgan");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const hpp = require("hpp");

const AppError = require("./utils/AppError");
const nftsRouter = require("./routes/nftsRoute");
const usersRouter = require("./routes/usersRoute");
const globalErrorHandler = require("./controllers/errorController");

const app = express();
app.use(express.json({ limit: "10kb" }));

//DATA SANITIZATION AGAINST NOSQL QUERY INJECTION
app.use(mongoSanitize());

//DATA SANITIZATION AGAINST XSS
app.use(xss());
//PREVENT PARAMETER POLLUTION
app.use(
  hpp({
    whitelist: [
      "duration",
      "difficulty",
      "ratingsQuantity",
      "ratingsAverage",
      "maxGroupSize",
      "price",
    ],
  })
);

//SET SECURITY HTTP HEADERS
app.use(helmet());
//File Upload
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

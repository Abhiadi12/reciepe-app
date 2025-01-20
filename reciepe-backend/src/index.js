// write basic express code
const express = require("express");
const bodyParser = require("body-parser");
const apiRouter = require("./routes");
const errorHandler = require("./middlewares/error.middleware");
const connectDB = require("./config").dbConnectionConfig;
const { PORT } = require("./config").serverConfig;

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/ping", (req, res) => {
  return res.status(200).send({ message: "problem service is alive." });
});

app.use("/api", apiRouter);
app.use(errorHandler);

app.listen(PORT, async () => {
  console.log(`Server is running on PORT ${PORT}`);
  await connectDB();
});

const express = require("express");
require("dotenv").config({});
const taskRouter = require("./routes/tasks");
const connectToDB = require("./db/connect");
const notFound = require("./middlewares/not-found");
const errorHandlerMiddleware = require("./middlewares/error-handler");

const app = express();
app.use(express.json());

app.use("/api/v1/tasks", taskRouter);

app.use(notFound);
app.use(errorHandlerMiddleware);

const port = 3000;

const start = async () => {
  try {
    await connectToDB(`${process.env.MONGODB_URI}/${process.env.DB_NAME}`);
    app.listen(port, () => {
      console.log(`Server is listening on PORT ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();

import express from "express";
import router from "../routes";

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use("/api", router);
const start = async () => {
  try {
    app.listen(PORT, () => {
      console.log(`server start on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();

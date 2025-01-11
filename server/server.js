import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { configDotenv } from "dotenv";
import router from "./routes/users.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
configDotenv();

app.use("/auth", router);

app.get("/", (req, res) => {
  res.send("server running on port 3000");
});

app.listen(PORT, () => {
  console.log("server running on port", PORT);
});

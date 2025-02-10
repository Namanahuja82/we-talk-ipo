import express from "express";
import closed from "./routes/closed.js";
import announced from "./routes/announced.js";
import upcoming from "./routes/upcoming.js";
import upcomingSME from "./routes/upcomingSME.js";
import closedSME from "./routes/closedSME.js";
import upcomingAll from "./routes/upcomingAll.js"
import cors from 'cors';
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

app.use(express.json()); 

app.use("/get/closed", closed);
app.use("/get/announced", announced);
app.use("/get/upcoming", upcoming);
app.use("/get/upcomingSME", upcomingSME);
app.use("/get/closedSME", closedSME);
app.use("/get/upcomingAll", upcomingAll);


app.listen(process.env.PORT, () => {
  console.log(`app running at ${process.env.PORT}`);
});

//sepration sme and mainboard(closed and upcoming)

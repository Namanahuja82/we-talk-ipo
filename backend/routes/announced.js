import express from "express";
import fetch from "node-fetch";

const router = express.Router();

export default router.get("/", (req, res) => {
  const url = "https://api.ipoalerts.in/ipos?status=announced";
  const options = {
    method: "GET",
    headers: {
      "x-api-key": `${process.env.Ipo_Alerts_Api_Key}`,
    },
  };

  fetch(url, options)
    .then((response) => response.json())
    .then((data) => res.send(data))
    .catch((error) => console.error("Error fetching IPO data:", error));
});

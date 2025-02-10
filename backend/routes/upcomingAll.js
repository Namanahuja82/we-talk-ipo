import express from "express";
import fetch from "node-fetch";

const router = express.Router();

router.get("/", (req, res) => {
  const url = "https://api.ipoalerts.in/ipos?status=upcoming";
  const options = {
    method: "GET",
    headers: {
      "x-api-key": `${process.env.Ipo_Alerts_Api_Key}`,
    },
  };

  fetch(url, options)
    .then((response) => response.json())
    .then((data) => {
      if (!data.ipos || !Array.isArray(data.ipos)) {
        return res.status(500).json({ error: "Invalid response from API" });
      }

      res.json({ count: data.length, ipos: data.ipos });
    })
    .catch((error) => {
      console.error("Error fetching IPO data:", error);
      res.status(500).json({ error: "Failed to fetch IPO data" });
    });
});

export default router;

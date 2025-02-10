import express from "express";
import fetch from "node-fetch";

const router = express.Router();

export default router.get("/", (req, res) => {
  const url = "https://api.ipoalerts.in/ipos?status=closed";
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
      const nonSmeIpos = data.ipos.filter((ipo) => ipo.type !== "SME");
      res.json({ count: nonSmeIpos.length, ipos: nonSmeIpos });
    })
    .catch((error) => console.error("Error fetching IPO data:", error));
});



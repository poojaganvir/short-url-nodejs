const express = require("express");

const { 
    handleGenerateNewShortURL,
    handleGetShortenedURL,
    handleGetTotalClicksOfURL
} = require("../controllers/url");

const router = express.Router();

router.post("/", handleGenerateNewShortURL);
router.get("/:shortId", handleGetShortenedURL);
router.get("/analytics/:shortId", handleGetTotalClicksOfURL);

module.exports = router;
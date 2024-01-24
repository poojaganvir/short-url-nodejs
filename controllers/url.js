const URL = require("../models/url");
const shortid = require("shortid");

const handleGenerateNewShortURL = async(req, res) => {
    const body = req.body;
    if(!body.url) { res.status(400).json({ msg: "URL is required"}) }
    const shortID = shortid();

    const result = await URL.create({
        shortId: shortID,
        redirectURL: body.url,
        visitHistory: [],
        createdBy: req.user._id
    });

    return res.render("home", { id: shortID });
};

const handleGetShortenedURL = async(req, res) => {
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate({
        shortId
    }, {
        $push: {
            visitHistory: {
                timestamps: Date.now()
            }
        }
    });

    res.redirect(entry.redirectURL);
};

const handleGetTotalClicksOfURL = async(req, res) => {
    const shortId = req.params.shortId;
    const result = await URL.findOne({ shortId });
    return res.json({ 
        totalClicks: result.visitHistory.length,
        analytics: result.visitHistory
    });
}

module.exports = {
    handleGenerateNewShortURL,
    handleGetShortenedURL,
    handleGetTotalClicksOfURL
}
var express = require("express");
var router = express.Router();
const asyncHandler = require("express-async-handler");

var { processLink } = require("../transcription/index");

// Health Check
router.get("", function (req, res, next) {
  return res.sendStatus(200);
});

router.get(
  "/summary",
  asyncHandler((req, res, next) => {
    summary = { done: true, summary: "YAY" };
    return res.json(summary).status(200);
  })
);

router.post(
  "/summary",
  asyncHandler((req, res, next) => {
    const link = req.query.link;

    if (!link) {
      return res.sendStatus(400);
    }

    processLink(link);

    return res.sendStatus(200);
  })
);

module.exports = router;

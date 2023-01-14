var express = require("express");
var router = express.Router();

var { processLink } = require("../transcription/index");

// Health Check
router.get("", function (req, res, next) {
  return res.sendStatus(200);
});

router.get("/summary", function (req, res, next) {
  summary = "YAY";
  return res.json(summary).status(200);
});

router.post("/summary", function (req, res, next) {
  const link = req.query.link;

  if (!link) {
    return res.sendStatus(400);
  }

  processTranscription(link);

  return res.sendStatus(200);
});

module.exports = router;

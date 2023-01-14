var express = require("express");
var router = express.Router();
const { summarise } = require("../assembly_ai");
const { getSummary, addSummary } = require("../db/summary");

var { processLink } = require("../transcription/index");

// Health Check
router.get("", function (req, res, next) {
  return res.sendStatus(200);
});

router.get("/summary", (req, res, next) => {
  const link = req.query.link;

  if (!link) {
    return res.sendStatus(400);
  }

  summary = getSummary(link);

  data = {
    done: !!summary,
    summary: summary || "",
  };
  return res.json(data).status(200);
});

router.post("/summary", (req, res, next) => {
  const link = req.query.link;

  if (!link) {
    return res.sendStatus(400);
  }

  processLink(link).then((buffer) => {
    summarise(buffer).then((data) => {
      if (!data) {
        return;
      }

      const { summary } = data;
      addSummary(link, summary);
    });
  });

  return res.sendStatus(200);
});

module.exports = router;

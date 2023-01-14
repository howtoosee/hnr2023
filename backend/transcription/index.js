var ytdl = require("ytdl-core");
const fs = require("fs");

const processLink = async (link) => {
  const video = ytdl(link, { filter: "audioonly", quality: "highestaudio" });

  var newLink = link.split("v=")[1];

  video.pipe(fs.createWriteStream("temp/audio/" + newLink + ".mp4"));
  const buffer = fs.readFileSync("temp/audio/" + newLink + ".mp4");
  return buffer;
};

module.exports = { processLink };

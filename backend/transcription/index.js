var ytdl = require("ytdl-core");
const fs = require("fs");

const processLink = async (link) => {
  const video = ytdl(link, { filter: "audioonly", quality: "highestaudio" });

  var newLink = link.split("v=")[1];

  const path = "temp/audio/" + newLink + ".mp4";
  video.pipe(fs.createWriteStream(path));
  const buffer = fs.readFileSync(path);
  return buffer;
};

module.exports = { processLink };

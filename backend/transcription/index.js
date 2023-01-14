var ytdl = require("ytdl-core");
const fs = require("fs");

const processLink = async (link) => {
    const video = ytdl(link, { filter: "audioonly", quality: "highestaudio" });
    console.log(video);

    var newLink = link.split("v=")[1];

    video.pipe(fs.createWriteStream("temp/audio/" + newLink + ".mp4"));
};

processLink("https://www.youtube.com/watch?v=9bZkp7q19f0");

module.exports = { processLink };

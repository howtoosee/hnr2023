var ytdl = require("ytdl-core");
const fs = require("fs");

const processLink = async (link) => {
    const video = ytdl(link, { filter: "audioonly", quality: "highestaudio" });

    var newLink = link.split("v=")[1];

    video.pipe(fs.createWriteStream("temp/audio/" + newLink + ".mp4"));

    var buffer = fs.readFile("temp/audio/" + newLink + ".mp4", (err, data) => {
        if (err) throw err;
        console.log(data);
    });
};

processLink("https://www.youtube.com/watch?v=9bZkp7q19f0");

module.exports = { processLink };

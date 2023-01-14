const { upload_file } = require("./upload.js");
const axios = require("axios");


const assembly = axios.create({
    baseURL: "https://api.assemblyai.com/v2",
    headers: {
        authorization: process.env.ASSEMBLY_AI_KEY,
    },
});

const assembly_summarise = function(file) {
    const url = upload_file(file);

    let summarised_text = "";

    assembly.post("/transcript", {
            audio_url: url,
            summarization: true,
            summary_model: "informative",
            summary_type: "bullets_verbose"
        })
        .then((res) => {summarised_text = res.data})
        .catch((err) => {
            console.error(err);
            summarised_text = "ML processing error."
        });
    
    return summarised_text;
}

module.exports = {
    assembly_summarise,
}

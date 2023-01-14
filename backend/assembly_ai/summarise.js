const { upload_file } = require("./upload.js");
const axios = require("axios");
const { performance } = require('perf_hooks');

const sleep = function(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

require("dotenv").config();


const assembly = axios.create({
    baseURL: "https://api.assemblyai.com/v2",
    headers: {
        authorization: process.env.ASSEMBLY_AI_KEY,
    },
});

const assembly_summarise = async function(file, language_code = "en") {
    const terminating_statuses = ["completed", "error"];
    const url = await upload_file(file);

    if (!url) {
        return;
    }

    const start_processing = async function(){
        console.info("AI initialising transcription and summarisation");
        return await assembly
            .post("/transcript", {
                audio_url: url,
                language_code: language_code,
                summarization: true,
                summary_model: "informative",
                summary_type: "bullets_verbose"
            })
            .then((res) => res.data)
            .catch((err) => console.error(err));
    }

    let curr_status = await start_processing();
    const start_time = performance.now();
    console.info(`Starting AI transcription and summarisation with language '${language_code}'`);

    const get_status = async function() {
        return await assembly
            .get(`/transcript/${curr_status.id}`)
            .then((res) => res.data)
            .catch((err) => console.error(err));
    } 

    while (!terminating_statuses.includes(curr_status.status)) {
        const duration = ((performance.now() - start_time ) / 1000).toFixed(2);
        console.info(`AI awaiting completion of transcription and summarisation, ${duration} sec elapsed`);

        curr_status = await get_status();
        await sleep(10 * 1000);
    }
    
    if (curr_status.status == "error") {
        return console.error("AI processing error:", curr_status.error);
    }

    return {
        transcription: curr_status.text || "",
        summary: curr_status.summary || "",
    };
}

module.exports = {
    assembly_summarise,
};


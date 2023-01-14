const axios = require("axios");
const fs = require("fs");

const assembly = axios.create({
    baseURL: "https://api.assemblyai.com/v2",
    headers: {
        authorization: process.env.ASSEMBLY_AI_KEY,
        "transfer-encoding": "chunked",
    },
});

const upload_file = async function(file) {
    const uploaded_url = await assembly
        .post("/upload", file)
        .then((res) => res.data.upload_url)
        .catch((err) => console.error(err));

    return uploaded_url;
}

module.exports = {
    upload_file,
}

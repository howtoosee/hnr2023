const axios = require("axios");
const fs = require("fs");

const assembly = axios.create({
    baseURL: "https://api.assemblyai.com/v2",
    headers: {
        authorization: process.env.ASSEMBLY_AI_KEY,
        "transfer-encoding": "chunked",
    },
});

const upload_file = function(file_path) {
    let uploaded_url = "";

    fs.readFile(file_path, (err, data) => {
        if (err) {
            return console.error(err);
        }
    
        assembly
            .post("/upload", data)
            .then((res) => {uploaded_url = res.data})
            .catch((err) => console.error(err));
    });

    console.info("File uploaded to: ", uploaded_url);
    return uploaded_url;
}

module.exports = {
    upload_file,
}
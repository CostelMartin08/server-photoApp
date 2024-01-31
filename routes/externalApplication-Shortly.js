const express = require("express");
const router = express.Router();
const fetch = require('node-fetch');


//Martinescu Constantin  Shortly App


router.post('/', async (req, res) => {
    try {
        const longUrl = req.body.url;


        if (!isValidUrl(longUrl)) {
            console.error("URL invalid:", longUrl);
            return res.status(400).json({ error: "Invalid URL" });
        }

        const apiUrl = "https://shrtlnk.dev/api/v2/link";
        const apiKey = "RynX9C2AGKRTLQfI4qxPFv1lg9Sxb3CkbYh0eZ9dVJERZ";

        const requestBody = {
            url: longUrl
        };

        const fetchOptions = {
            method: 'POST',
            body: JSON.stringify(requestBody),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'api-key': apiKey
            },
        };

        const response = await fetch(apiUrl, fetchOptions);

        if (!response.ok) {
            const errorData = await response.json();
            console.error("Eroare:", errorData.message);
            return res.status(response.status).json({ error: errorData.message });
        }

        const data = await response.json();

        const shortUrl = data.shrtlnk;
        res.json({ shortUrl });
    } catch (error) {
        console.error("Eroare în timpul cererii fetch:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


function isValidUrl(url) {

    return true;
}

module.exports = router    
const express = require("express");
const router = express.Router();


//Martinescu Constantin  Shortly App


router.post('/', async (req, res) => {
    try {

        const longUrl = req.body.url;

        const encodedLongUrl = encodeURIComponent(longUrl);

        const requestBody = `url=${encodedLongUrl}`;


        const apiUrl = "https://cleanuri.com/api/v1/shorten";


        const fetchOptions = {
            method: 'POST',
            body: requestBody,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        };

        const response = await fetch(apiUrl, fetchOptions);

        if (!response.ok) {
            console.error("HTTP error:", response.status, response.statusText);
            res.status(500).json({ error: "Internal Server Error" });
            return;
        }

        const responseData = await response.text();

        try {
            // Try parsing the response as JSON
            const data = JSON.parse(responseData);

            if (data.error) {
                console.error("API Error:", data.error);
                res.status(500).json({ error: data.error });
            } else {
                const shortUrl = data.result_url;
                res.json({ shortUrl });
            }
        } catch (jsonError) {
            console.error("Error parsing JSON:", jsonError);
            res.status(500).json({ error: "Internal Server Error" });
        }
    } catch (error) {
        console.error("Error during fetch request:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router    
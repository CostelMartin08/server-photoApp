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
        const data = await response.json();


        if (data.error) {
            console.error("Eroare:", data.error);
            res.status(500).json({ error: data.error });
        } else {

            const shortUrl = data.result_url;
            res.json({ shortUrl });
        }
    } catch (error) {
        console.error("Eroare în timpul cererii fetch:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router    
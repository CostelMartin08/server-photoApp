const multer = require("multer");
const fs = require('fs');


const customStorage = (details) => {

    return multer.diskStorage({
        destination: function (req, file, cb) {

            let destinationPath = `./public/uploads/${details.category}/${details.title}`;


            if (!fs.existsSync(destinationPath)) {
                fs.mkdirSync(destinationPath, { recursive: true });
            }

            cb(null, destinationPath);
        },
        filename: function (req, file, cb) {

            cb(null, `${details.title}-${file.originalname}`);
        },
    });
};

const uploadMiddleware = (details) => {
    return multer({
        storage: customStorage(details),

    }).single('file');
};

module.exports = uploadMiddleware;

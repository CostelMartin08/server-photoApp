const multer = require("multer");
const path = require('path');
const fs = require('fs');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const category = file.fieldname;
    const text = req.body.text;

    let destinationPath = "./public/uploads";

    switch (category) {
      case 'nunti':
        destinationPath = path.join(destinationPath, "Nunti", text);
        break;
      case 'botezuri':
        destinationPath = path.join(destinationPath, "Botezuri", text);
        break;
      case 'diverse':
        destinationPath = path.join(destinationPath, "Diverse", text);
        break;
    }


    if (!fs.existsSync(destinationPath)) {
      fs.mkdirSync(destinationPath, { recursive: true });
    }

    cb(null, destinationPath);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });
module.exports = upload;

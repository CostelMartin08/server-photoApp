const multer = require("multer");
const path = require("path");
const fs = require("fs");

function ensurePermissions(folderPath, mode = 0o775) {
  if (fs.existsSync(folderPath)) {
    fs.chmodSync(folderPath, mode);
    const items = fs.readdirSync(folderPath);
    for (const item of items) {
      const itemPath = path.join(folderPath, item);
      if (fs.lstatSync(itemPath).isDirectory()) {
        ensurePermissions(itemPath, mode); // recursive perm
      } else {
        fs.chmodSync(itemPath, mode);
      }
    }
  }
}
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const text = req.body.text || "default";
    let destinationPath = "./public/uploads";

    if (file.fieldname === "thumbnail") {
      destinationPath = path.join(destinationPath, "thumbnails");
    } else {
      switch (file.fieldname) {
        case "nunti":
          destinationPath = path.join(destinationPath, "Nunti", text);
          break;
        case "botezuri":
          destinationPath = path.join(destinationPath, "Botezuri", text);
          break;
        case "diverse":
          destinationPath = path.join(destinationPath, "Diverse", text);
          break;
        default:
          destinationPath = path.join(destinationPath, "Other", text);
      }
    }

    if (!fs.existsSync(destinationPath)) {
      fs.mkdirSync(destinationPath, { recursive: true });
    }

    // Setează permisiuni și pe directoare existente
    ensurePermissions(destinationPath, 0o775);

    cb(null, destinationPath);
  },

  filename: function (req, file, cb) {
  cb(null, file.originalname);
}
,
});

const upload = multer({ storage: storage });

module.exports = upload;
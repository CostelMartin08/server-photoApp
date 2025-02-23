const fs = require("fs");
const path = require("path");

/**

 * @param {string} filePath 
 */
const deleteThumbnail = (filePath) => {
    if (!filePath) {
        console.warn("⚠️ Calea fișierului este invalidă.");
        return;
    }

    const absolutePath = path.resolve(filePath);

    fs.access(absolutePath, fs.constants.F_OK, (err) => {
        if (err) {
            console.warn(`⚠️ Fișierul nu există: ${absolutePath}`);
            return;
        }

        fs.unlink(absolutePath, (err) => {
            if (err) {
                console.error(`❌ Eroare la ștergerea fișierului: ${absolutePath}`, err);
            } else {
                console.log(`✅ Thumbnail șters cu succes: ${absolutePath}`);
            }
        });
    });
};

module.exports = { deleteThumbnail };

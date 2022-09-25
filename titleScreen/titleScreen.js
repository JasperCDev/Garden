const fs = require("node:fs/promises");

function createSaveFile(n) {
  fs.writeFile(`saveFiles/save_file_${n}`, "file content", (err) => {
    if (err) throw err;
    console.log("file saved!");
  });
}

createSaveFile(1);

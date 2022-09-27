const electron = require("electron");
const fs = require("node:fs/promises");

electron.ipcRenderer.on("send-save-data", (e, saveData) => {
  window.initialSaveData = saveData;

  // run game script
  let script = document.createElement("script");
  script.src = "./GardenGameMain/dist/assets/index.js";
  script.type = "module";
  script.crossOrigin = true;
  document.head.appendChild(script);
  window.addEventListener("keyup", (e) => {
    if (e.key === "Escape") {
      electron.ipcRenderer.invoke("exit-to-title");
    }
  });
  setInterval(() => {
    fs.writeFile(
      `saveFiles/save_file_${1}.JSON`,
      JSON.stringify(window.initialSaveData),
      (err) => {
        if (err) throw err;
        console.log("file saved!");
      }
    );
  }, 1000);
});

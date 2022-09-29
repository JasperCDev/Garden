const electron = require("electron");
const fs = require("node:fs/promises");

electron.ipcRenderer.on("send-save-data", (e, data) => {
  // set timeStamps, this should be set after the inital game render, but meh
  const now = Date.now();
  const time = data.saveGameData.world.time;
  time.sessionTimeStamp = now;
  time.dayTimeStamp = now - time.dayTime;
  window.initialSaveData = data.saveGameData;
  window.saveSlot = data.saveSlot;

  // run game script
  const script = document.createElement("script");
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
      `saveFiles/save_file_${window.saveSlot}.JSON`,
      JSON.stringify(window.initialSaveData),
      (err) => {
        if (err) throw err;
        console.log("file saved!");
      }
    );
  }, 1000);
});

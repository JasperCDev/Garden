const electron = require("electron");

electron.ipcRenderer.on("send-save-data", (e, saveData) => {
  window.initialSaveData = saveData;
  console.log("INITIALSAVEDATA", window.initialSaveData);

  // run game script
  let script = document.createElement("script");
  script.src = "./GardenGameMain/dist/assets/index.js";
  script.type = "module";
  script.crossOrigin = true;
  document.head.appendChild(script);
});

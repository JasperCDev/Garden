const electron = require("electron");

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
});

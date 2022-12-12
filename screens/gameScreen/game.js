const electron = require("electron");
const fs = require("node:fs/promises");
const pauseDiv = document.getElementById("pause");

function loadGameScript() {
  const script = document.createElement("script");
  script.src = "../../GardenGameMain/dist/assets/index.js";
  script.type = "module";
  script.crossOrigin = true;
  document.head.appendChild(script);
}

function registerListeners() {
  window.addEventListener("keyup", (e) => {
    if (e.key === "Escape") {
      electron.ipcRenderer.invoke("exit-to-title");
    }
  });
}

function handlePause() {
  pauseDiv.style.visibility = "visible";
}

function handleResume() {
  pauseDiv.style.visibility = "hidden";
}

function initGameEvents() {
  // these are meant for communication between the render process (this file) and the vite application (game code)
  const pauseEvent = new Event("pause");
  const resumeEvent = new Event("resume");
  window.gameEvents = {
    pauseEvent,
    resumeEvent,
  };

  window.addEventListener("pause", handlePause);
  window.addEventListener("resume", handleResume);
}

function registerSaveInterval() {
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
}

electron.ipcRenderer.on("send-save-data", (e, data) => {
  window.initialSaveData = data.saveGameData;
  window.saveSlot = data.saveSlot;
  initGameEvents();
  registerListeners();
  registerSaveInterval();
  loadGameScript();
});

const fs = require("node:fs/promises");
const fsSync = require("node:fs");
const remote = require("electron").remote;

function createSaveFile(n) {
  fs.writeFile(
    `saveFiles/save_file_${n}.JSON`,
    `{ "file": "content" }`,
    (err) => {
      if (err) throw err;
      console.log("file saved!");
    }
  );
}

function readFile(n) {
  return fs.readFile(`saveFiles/save_file_${n}.json`);
}

function fileExists(n) {
  return fsSync.existsSync(`saveFiles/save_file_${n}.json`);
}

function startGame(n) {
  createSaveFile(n);
}

async function loadGame(n) {
  const content = await readFile(n);
  const saveGameData = JSON.parse(content);
  console.log(saveGameData);
}

function handleButtonClick(button, n) {
  if (button.textContent === "Continue") {
    return loadGame(n);
  }
  return startGame(n);
}

const button_1 = document.getElementById("button_1");
const button_2 = document.getElementById("button_2");
const button_3 = document.getElementById("button_3");

window.addEventListener("load", () => {
  createSaveFile(1);
  button_1.textContent = fileExists(1) ? "Continue" : "New Game";
  button_2.textContent = fileExists(2) ? "Continue" : "New Game";
  button_3.textContent = fileExists(3) ? "Continue" : "New Game";

  button_1.onclick = () => {
    handleButtonClick(button_1, 1);
  };

  button_2.onclick = () => {
    handleButtonClick(button_2, 2);
  };

  button_3.onclick = () => {
    handleButtonClick(button_3, 3);
  };
});

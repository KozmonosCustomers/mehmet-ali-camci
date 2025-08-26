const fs = require("fs");
const path = require("path");

const inputDir = path.join(__dirname, "content/videos");
const outputFile = path.join(__dirname, "videos.json");

const all = fs.readdirSync(inputDir)
  .filter(f => f.endsWith(".json"))
  .map(f => JSON.parse(fs.readFileSync(path.join(inputDir, f), "utf8")));

fs.writeFileSync(outputFile, JSON.stringify(all, null, 2), "utf8");
console.log("videos.json oluşturuldu:", all.length, "video eklendi.");

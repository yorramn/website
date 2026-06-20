const fs = require("fs");
const path = require("path");

const root = __dirname;
const output = path.join(root, "dist");
const files = ["index.html", "styles.css", "styles-overrides.css", "script.js", "llms.txt", "google0eab71c0078a4591.html"];

fs.rmSync(output, { recursive: true, force: true });
fs.mkdirSync(output, { recursive: true });
files.forEach((file) => fs.copyFileSync(path.join(root, file), path.join(output, file)));
fs.cpSync(path.join(root, "assets"), path.join(output, "assets"), { recursive: true });
console.log(`Site gerado em ${output}`);

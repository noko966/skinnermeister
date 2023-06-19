const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors"); // import cors module
const helmet = require("helmet");

const app = express();

// use cors middleware
app.use(cors());

// serve static files from 'output' directory
app.use("/partners", express.static(path.join(__dirname, "output")));

function fileList(dirPath) {
  return new Promise((resolve, reject) => {
    fs.readdir(dirPath, (err, files) => {
      if (err) {
        reject(err);
        return;
      }
      const fileNames = files.map((file) => path.parse(file).name);
      resolve(fileNames);
    });
  });
}

app.get("/directories", async (req, res) => {
  const dirPath = path.join(__dirname, "output");
  console.log(dirPath);

  try {
    const files = await fileList(dirPath);
    res.send(files);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

app.listen(5500, () => console.log("Server listening on port 5500"));

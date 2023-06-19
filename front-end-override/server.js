const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const dirPath = path.join(__dirname, "../", "output");

const app = express();
// CORS middleware
app.use(cors());

// serve static files from 'output' directory
app.use("/partners", express.static(dirPath));

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
  console.log(dirPath);

  try {
    const files = await fileList(dirPath);
    res.send(files);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

app.listen(5500, () => console.log("Server listening on port 5500"));

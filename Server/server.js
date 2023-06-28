const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const dirPath = path.join(__dirname, "../", "output");

const app = express();

// CORS middleware
app.use(cors());

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

// serve static files from 'output' directory
app.use("/partners", express.static(dirPath));

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








// let partners;

// fetch("http://127.0.0.1:5500/directories")
//   .then((response) => response.json())
//   .then((files) => {
//     partners = files;
//     console.log("==========   Partners: ", partners);
//   })
//   .catch((error) => console.error("Error:", error));

// const head = document.getElementsByTagName("head")[0];
// let current = 0;

// function setCSSOverride(id) {
//   console.log("==========   Current partner: ", id);
//   let link = document.getElementById("partnerStyleCssLink");
//   if (link) {
//     link.href = `http://127.0.0.1:5500/partners/${id}.css`;
//   } else {
//     link = document.createElement("link");
//     link.rel = "stylesheet";
//     link.type = "text/css";
//     link.href = `http://127.0.0.1:5500/partners/${id}.css`;
//     link.media = "all";
//     link.id = "partnerStyleCssLink";
//     head.appendChild(link);
//     console.log("==========   CSS Link created ");
//   }
// }


// document.addEventListener("keyup", function (event) {
//   if (event.key === "ArrowLeft") {
//     setCSSOverride(partners[current--]);
//   }
// });
// document.addEventListener("keyup", function (event) {
//   if (event.key === "ArrowRight") {
//     setCSSOverride(partners[current++]);
//   }
// });


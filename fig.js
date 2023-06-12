const fs = require("fs");
const path = require("path");
const fetch = require("node-fetch");
//https://www.figma.com/file/bv5QTPsYNSPPQc35NvcW2u/Untitled?type=design&node-id=0%3A1&t=rDHaaPeesJ5AIM3W-1
// Set your Figma API access token and file key
const apiToken = "figd_5WkQSONqULF7OekUAHT6Tr4cBUlLJHfaiDn8ZemL";
const fileKey = "bv5QTPsYNSPPQc35NvcW2u";

// Make a GET request to retrieve the file information
// const fileUrl = `https://api.figma.com/v1/files/${fileKey}`;
const fileUrl = `https://api.figma.com/v1/files/${fileKey}`;
const fileHeaders = { "X-Figma-Token": apiToken };

let i = 0; // dots counter
let interVal;

// showing loading
function displayLoading() {
  interVal = setInterval(function () {
    process.stdout.clearLine(); // clear current text
    process.stdout.cursorTo(0); // move cursor to beginning of line
    i = (i + 1) % 4;
    var dots = new Array(i + 1).join(".");
    process.stdout.write("Waiting" + dots); // write text
  }, 300);
}

// hiding loading
function hideLoading() {
  clearInterval(interVal);
  process.stdout.clearLine();
  process.stdout.write("Done"); // write text
}

displayLoading();

fetch(fileUrl, { headers: fileHeaders })
  .then((response) => response.json())
  .then((fileData) => {
    // Extract the document key from the response

    const documentKey = fileData.document.id;

    const pageUrl = `https://api.figma.com/v1/files/${fileKey}/nodes?ids=${documentKey}`;
    fs.writeFileSync(
      path.join(__dirname, "output", "/", "fileData.json"),
      JSON.stringify(fileData),
      () => console.log("file data done")
    );
    fetch(pageUrl, { headers: fileHeaders })
      .then((response) => response.json())
      .then((pageData) => {
        // Extract the ID of the specific page you want to copy elements from
        const pageId = documentKey; // Assuming the page to copy is the root document node
        const elementsUrl = `https://api.figma.com/v1/files/${fileKey}/nodes?ids=${pageId}`;
        fs.writeFileSync(
          path.join(__dirname, "output", "/", "pageData.json"),
          JSON.stringify(pageData),
          () => console.log("page data done")
        );
        // fetch(elementsUrl, { headers: fileHeaders })
        //   .then(response => response.json())
        //   .then(elementsData => {
        //     // Iterate over the nodes and copy the required elements
        //     // for (const nodeId in elementsData.nodes) {
        //       // const nodeData = elementsData.nodes[nodeId];
        //       // console.log(`Copying node ID: ${nodeId}`);

        //       // console.log(JSON.stringify(nodeData, null, 2));
        //     // }

        //     fs.writeFileSync(
        //       path.join(__dirname, "output", "/", "fileData.json"),
        //       JSON.stringify(elementsData),
        //       ()=>console.log("elements data done")
        //     );

        //    hideLoading()

        // }).catch(error => {
        //   console.log('Error retrieving node data:', error);
        // });
        hideLoading();
      })
      .catch((error) => {
        console.log("Error retrieving page data:", error);
      });
  })
  .catch((error) => {
    console.log("Error retrieving file data:", error);
  });

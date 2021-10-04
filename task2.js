// Setup Packages
const fs = require("fs");
const csv = require("csvtojson");
const path = require("path");

// Setup Read/Write paths
const readPath = path.join(__dirname, "./csv/file.csv");
const writePath = path.join(__dirname, "./file.txt");

// Reader/Writer Streams
const reader = fs.createReadStream(readPath);
const writer = fs.createWriteStream(writePath);

reader.on('data', (chunk) => {
  // Convert chunk string to JSON then write to file
  csv()
    .fromString(chunk.toString())
    .subscribe(
      (json, lineNumber) => {
        try {
          writer.write(JSON.stringify(json) + "\n");
        } catch(error) {
          console.error(error);
        }
      },
      (error) => {
        console.error(error);
      }
    );
})


import fs from "fs";
import csv from "csvtojson";
import path from "path";
import { pipeline } from "stream";

function csvToJson() {
  // Setup Read/Write paths
  const readPath = path.join(__dirname, "./../csv/file.csv");
  const writePath = path.join(__dirname, "./../file.txt");

  // Reader/Writer Streams
  const reader = fs.createReadStream(readPath);
  const writer = fs.createWriteStream(writePath);

  // Convert string to JSON
  const transform = csv().subscribe(
    (json, lineNumber) => {
      try {
        return JSON.stringify(json) + "\n";
      } catch (error) {
        console.error(error);
      }
    },
    (error) => {
      console.error(error);
    }
  );

  // Our callback function
  const callback = (error) => {
    if (error) {
      console.error("Pipeline failed.", error);
    } else {
      console.log("Pipeline succeeded.");
    }
  };

  // Run our pipeline
  pipeline(reader, transform, writer, callback);
}

module.exports = { csvToJson };
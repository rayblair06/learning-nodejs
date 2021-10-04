"use strict";

// Setup Packages
var fs = require("fs");
var csv = require("csvtojson");
var path = require("path");

// Setup Read/Write paths
var readPath = path.join(__dirname, "./../csv/file.csv");
var writePath = path.join(__dirname, "./../file.txt");

// Reader/Writer Streams
var reader = fs.createReadStream(readPath);
var writer = fs.createWriteStream(writePath);

function csvToJson() {
  reader.on("data", function (chunk) {
    // Convert chunk string to JSON then write to file
    csv().fromString(chunk.toString()).subscribe(function (json, lineNumber) {
      try {
        writer.write(JSON.stringify(json) + "\n");
      } catch (error) {
        console.error(error);
      }
    }, function (error) {
      console.error(error);
    });
  });
}

module.exports = { csvToJson: csvToJson };
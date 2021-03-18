import csv from "csvtojson";
import fs from "fs";
import path from "path";

export function transform() {
  const { stdout } = process;

  const inputFilePath = path.join(__dirname, "csv", "data.csv");
  const outputFilePath = path.join(__dirname, "txt", "data.txt");

  const readStream = fs.createReadStream(inputFilePath);
  const writeStream = fs.createWriteStream(outputFilePath);

  readStream
    .pipe(csv())
    .on("error", (err) => {
      stdout.write(err);
    })
    .pipe(writeStream)
    .on("error", (err) => {
      stdout.write(err);
    });
}

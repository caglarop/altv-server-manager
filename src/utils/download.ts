import axios from "axios";
import fs from "fs";
import path from "path";

export async function downloadFile(url: string, directoryPath: string) {
  const response = await axios.get(url, { responseType: "stream" });

  // Extract the file name from the url
  const fileName: string = url.split("/").pop()!;

  // Combine the directory path and the file name
  const filePath = path.join(directoryPath, fileName);

  // Ensure the directory exists
  fs.mkdirSync(directoryPath, { recursive: true });

  const writer = fs.createWriteStream(filePath);

  response.data.pipe(writer);

  return new Promise((resolve, reject) => {
    writer.on("finish", resolve);
    writer.on("error", reject);
  });
}

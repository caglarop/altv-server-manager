/* eslint-disable */
//@ts-nocheck
import express from "express";
import { exec } from "child_process";
import os from "os";
import { fileURLToPath } from "url";
import path, { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = 3003; // Port for the express app

app.get("/server/control/:id", (req, res) => {
  const serverId = req.params.id;
  const action = req.query.action;

  if (!["start", "stop", "restart"].includes(action)) {
    res.status(400).send("INVALID_ACTION");
    return;
  }

  console.log(
    `${action.charAt(0).toUpperCase() + action.slice(1)} server ${serverId}...`,
  );

  const serverDir = path.join(__dirname, "../", "server-data", serverId);
  const scriptExtension = os.platform() === "win32" ? ".bat" : ".sh";
  const scriptPath = path.join(serverDir, `server-launcher${scriptExtension}`);

  exec(`"${scriptPath}"`, { cwd: serverDir }, (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      res.status(500).send("SERVER_ERROR");
      return;
    }

    console.log(`stdout: ${stdout}`);
    console.error(`stderr: ${stderr}`);
    res.send("OK");
  });
});

app.listen(port, () => {
  console.log(`Server control app listening at http://localhost:${port}`);
});

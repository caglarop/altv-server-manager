/* eslint-disable */
//@ts-nocheck
import express from "express";
import { exec } from "child_process";
import os from "os";
import { fileURLToPath } from "url";
import path, { dirname } from "path";
import { moveAndRenameLog } from "./utils.js";

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

  if (action === "start") {
    console.log("Starting server " + serverId);
  } else if (action === "stop") {
    console.log("Stopping server " + serverId);
  } else if (action === "restart") {
    console.log("Restarting server " + serverId);
  }

  const serverDir = path.join(__dirname, "../", "server-data", serverId);
  const scriptExtension = os.platform() === "win32" ? ".bat" : ".sh";
  const scriptPath = path.join(serverDir, `server-launcher${scriptExtension}`);

  moveAndRenameLog(serverDir);

  exec(`"${scriptPath}"`, { cwd: serverDir }, (err, stdout, stderr) => {
    if (err) {
      console.error(err);
      res.status(500).send("ERROR");
      return;
    }

    console.log(stdout);
    console.error(stderr);

    res.status(200).send("OK");
  });
});

app.listen(port, () => {
  console.log(`Server control app listening at http://localhost:${port}`);
});

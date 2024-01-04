/* eslint-disable */
//@ts-nocheck
import fs from "fs";
import path from "path";

export function moveAndRenameLog(serverDir) {
  try {
    const serverLogPath = path.join(serverDir, "server.log");
    const logsDir = path.join(serverDir, "logs");

    // Check if server.log exists
    if (fs.existsSync(serverLogPath)) {
      // Ensure logs directory exists
      if (!fs.existsSync(logsDir)) {
        fs.mkdirSync(logsDir);
      }

      // Generate unique log file name
      const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
      const newLogPath = path.join(logsDir, `server_${timestamp}.log`);

      // Move and rename server.log
      fs.renameSync(serverLogPath, newLogPath);
    }
  } catch (error) {
    console.error(`Error moving and renaming log: ${error}`);
  }
}

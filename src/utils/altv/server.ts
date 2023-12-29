import path from "path";
import fs from "fs";

import { SERVER_ASSETS } from "@/utils/altv/assets";
import { downloadFile } from "@/utils/download";
import getPlattform from "../utils";

export function getServerLauncherData() {
  const serverPlatform = getPlattform();

  const launcherFormat =
    serverPlatform === "windows" ? "server-launcher.bat" : "server-launcher.sh";

  const launcherPrefix =
    serverPlatform === "windows"
      ? "@echo off\ncall npm run start --silent"
      : "#!/bin/bash\nset echo off\nnpm run start --silent";
  const launcherCommand = "altv-server";

  return [launcherFormat, launcherPrefix, launcherCommand];
}

export async function createServerConfig(id: string) {
  const serverPath = path.join(process.cwd(), "server-data", id);

  const configPath = path.join(serverPath, "server.toml");

  if (!fs.existsSync(serverPath)) {
    throw new Error(`SERVER_NOT_FOUND`);
  }

  if (fs.existsSync(configPath)) {
    throw new Error(`SERVER_CONFIG_ALREADY_EXISTS`);
  }

  const config = `name = 'alt:V Server'
port = 7788
players = 128
# password = 'ultra-password'
announce = false
# token = 'YOUR_TOKEN'
gamemode = 'Freeroam'
website = 'example.com'
language = 'en'
description = 'alt:V Sample Server'
modules = ['js-module']
resources = []`;

  fs.writeFileSync(configPath, config);

  return { status: "SERVER_CONFIG_CREATED" };
}

export async function installAltVServer(id: string) {
  console.log(`Installing server ${id}...`);

  const { needUpdate } = await getAltVServerUpdateInfo(id);

  if (needUpdate) {
    console.log(`Server ${id} needs update. Downloading...`);

    await downloadAltVServer(id);

    await createServerConfig(id).catch(console.error);

    return { status: "SERVER_UPDATED" };
  } else {
    console.log(`Server ${id} is up to date.`);

    await createServerConfig(id).catch(console.error);
  }

  return { status: "SERVER_UP_TO_DATE" };
}

export async function downloadAltVServer(id: string) {
  const serverPlattform = getPlattform();

  const serverPath = path.join(process.cwd(), "server-data", id);

  if (!fs.existsSync(serverPath)) {
    fs.mkdirSync(serverPath, { recursive: true });
  }

  try {
    for (const asset of SERVER_ASSETS) {
      const url = asset[serverPlattform];

      const filePath = path.join(serverPath, asset.filePath);

      if (filePath.endsWith("update.json")) {
        const updateJson = JSON.parse(fs.readFileSync(filePath, "utf8"));
        updateJson.serverDataPath = serverPath;

        fs.writeFileSync(filePath, JSON.stringify(updateJson, null, 2));
      }

      await downloadFile(url, filePath);

      console.log(`Downloaded ${url} to ${filePath}`);
    }

    return { status: "SERVER_CREATED" };
  } catch (error) {
    console.error(`Failed to create server: `, error);

    return { status: `FAILED_TO_CREATE_SERVER` };
  }
}

export async function getAltVServerUpdateInfo(id: string) {
  const serverPlattform = getPlattform();

  const serverPath = path.join(process.cwd(), "server-data", id);

  try {
    let needUpdate = false;

    const updateJsonAsset = SERVER_ASSETS.find((asset) =>
      asset[serverPlattform].endsWith("/update.json"),
    );

    if (!updateJsonAsset) {
      throw new Error(`UPDATE_JSON_ASSET_NOT_FOUND`);
    }

    const updateJsonUrl = updateJsonAsset[serverPlattform];

    const currentServerData = JSON.parse(
      fs.readFileSync(path.join(serverPath, "update.json"), "utf8"),
    );

    const updateJsonCachePath = path.join(
      serverPath,
      `/cache/${updateJsonAsset.filePath}`,
    );

    await downloadFile(updateJsonUrl, updateJsonCachePath);

    const updatedServerData = JSON.parse(
      fs.readFileSync(updateJsonCachePath, "utf8"),
    );

    if (currentServerData.version !== updatedServerData.version) {
      needUpdate = true;
    }

    return {
      needUpdate,
      currentVersion: currentServerData.version,
      updatedVersion: updatedServerData.version,
      updateJsonAsset,
    };
  } catch (error) {
    return { needUpdate: true };
  }
}

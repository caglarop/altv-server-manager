import path from "path";
import fs from "fs";

import { SERVER_ASSETS } from "@/utils/altv/assets";
import { downloadFile } from "@/utils/download";
import getPlattform from "../utils";
import { db } from "@/server/db";

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

export type ServerConfig = {
  name: string;
  port: number;
  players: number;
  announce: boolean;
  gamemode: string;
  language: string;
  description: string;
  modules: string[];
  resources: string[];
  website: string;
  password: string;
  token: string;
};

export async function createServerConfig(
  id: string,
  port: number,
  defaultCfg: ServerConfig = {
    name: "alt:V Server",
    description: "alt:V Sample Server",
    port: 7788,
    players: 128,
    announce: false,
    gamemode: "Freeroam",
    language: "en",
    modules: ["js-module"],
    resources: [],
    website: "example.com",
    password: "ultra-password",
    token: "YOUR_TOKEN",
  },
) {
  const serverPath = path.join(process.cwd(), "server-data", id);

  const configPath = path.join(serverPath, "server.toml");

  if (!fs.existsSync(serverPath)) {
    return { status: "SERVER_NOT_FOUND" };
  }

  if (fs.existsSync(configPath)) {
    const configLines = fs.readFileSync(configPath, "utf8").split("\n");

    const portLineIndex = configLines.findIndex((line) =>
      line.startsWith("port"),
    );

    if (portLineIndex !== -1) {
      configLines.splice(portLineIndex, 1);
    }

    configLines.push(`port = ${port}`);

    fs.writeFileSync(configPath, configLines.join("\n"));

    return { status: "SERVER_CONFIG_UPDATED" };
  }

  const config = `
name = '${defaultCfg.name}'
port = ${port}
players = ${defaultCfg.players}
password = '${defaultCfg.password}'
announce = ${defaultCfg.announce}
token = '${defaultCfg.token}'
gamemode = '${defaultCfg.gamemode}'
website = '${defaultCfg.website}'
language = '${defaultCfg.language}'
description = '${defaultCfg.description}'
modules = [${defaultCfg.modules.map((module) => `'${module}'`).join(", ")}]
resources = [${defaultCfg.resources
    .map((resource) => `'${resource}'`)
    .join(", ")}]
`;

  fs.writeFileSync(configPath, config);

  return { status: "SERVER_CONFIG_CREATED" };
}

export async function installAltVServer(id: string, forceUpdate = false) {
  console.log(`Installing server ${id}...`);

  try {
    const server = await db.server.findUnique({
      where: { id },
    });

    if (!server) {
      return { status: "SERVER_NOT_FOUND" };
    }

    const { needUpdate } = await getAltVServerUpdateInfo(id);

    if (needUpdate || forceUpdate) {
      console.log(
        needUpdate
          ? `Server ${id} needs to be updated. Downloading server assets...`
          : `Force update server ${id}. Downloading server assets...`,
      );

      await db.server
        .update({
          where: { id },
          data: { isInstalling: true },
        })
        .catch(console.error);

      await downloadAltVServer(id).catch(console.error);

      await createServerConfig(id, server.port).catch(console.error);

      await db.server.update({
        where: { id },
        data: { isInstalling: false, isInstalled: true },
      });

      return { status: "SERVER_UPDATED" };
    }

    console.log(`Server ${id} is up to date.`);

    await createServerConfig(id, server.port).catch(console.error);

    return { status: "SERVER_UP_TO_DATE" };
  } catch (error) {
    console.error(error);

    return { status: "ERROR", error };
  }
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

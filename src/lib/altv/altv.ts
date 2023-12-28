import axios from "axios";

export const sendRequest = async (uri: string) => {
  const fetch = await axios.get(`https://api.alt-mp.com${uri}`, {
    headers: { Accept: "application/json", "cache-control": "no-cache" },
  });

  return fetch.data;
};

export const getServerByServerId = async (serverId: string) => {
  return await sendRequest(`/servers/${serverId}`);
};

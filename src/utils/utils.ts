export default function getPlattform() {
  const platform = process.platform;

  if (platform === "win32") {
    return "windows";
  } else if (platform === "linux") {
    return "linux";
  } else {
    throw new Error("UNSUPPORTED_PLATFORM");
  }
}

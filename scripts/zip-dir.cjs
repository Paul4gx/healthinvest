/**
 * Minimal zip of a directory (no extra deps). Uses PowerShell Compress-Archive on Windows
 * and `zip` on Unix when available; falls back to a tiny store-only zip writer.
 */
const { spawnSync } = require("child_process");
const fs = require("fs");
const path = require("path");

function walk(dir, base = dir, files = []) {
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name);
    const rel = path.relative(base, full).split(path.sep).join("/");
    if (fs.statSync(full).isDirectory()) walk(full, base, files);
    else files.push({ full, rel });
  }
  return files;
}

function crc32(buf) {
  let c = ~0;
  for (let i = 0; i < buf.length; i++) {
    c ^= buf[i];
    for (let k = 0; k < 8; k++) c = c & 1 ? (c >>> 1) ^ 0xedb88320 : c >>> 1;
  }
  return ~c >>> 0;
}

function u16(n) {
  const b = Buffer.alloc(2);
  b.writeUInt16LE(n, 0);
  return b;
}
function u32(n) {
  const b = Buffer.alloc(4);
  b.writeUInt32LE(n, 0);
  return b;
}

function writeStoreZip(sourceDir, zipPath) {
  const files = walk(sourceDir);
  const localParts = [];
  const centralParts = [];
  let offset = 0;

  for (const file of files) {
    const data = fs.readFileSync(file.full);
    const nameBuf = Buffer.from(file.rel, "utf8");
    const crc = crc32(data);
    const localHeader = Buffer.concat([
      u32(0x04034b50),
      u16(20),
      u16(0),
      u16(0),
      u16(0),
      u16(0),
      u32(crc),
      u32(data.length),
      u32(data.length),
      u16(nameBuf.length),
      u16(0),
      nameBuf,
    ]);
    const central = Buffer.concat([
      u32(0x02014b50),
      u16(20),
      u16(20),
      u16(0),
      u16(0),
      u16(0),
      u16(0),
      u32(crc),
      u32(data.length),
      u32(data.length),
      u16(nameBuf.length),
      u16(0),
      u16(0),
      u16(0),
      u16(0),
      u32(0),
      u32(offset),
      nameBuf,
    ]);
    localParts.push(localHeader, data);
    centralParts.push(central);
    offset += localHeader.length + data.length;
  }

  const centralDir = Buffer.concat(centralParts);
  const end = Buffer.concat([
    u32(0x06054b50),
    u16(0),
    u16(0),
    u16(files.length),
    u16(files.length),
    u32(centralDir.length),
    u32(offset),
    u16(0),
  ]);

  fs.writeFileSync(zipPath, Buffer.concat([...localParts, centralDir, end]));
}

function zipSync(sourceDir, zipPath) {
  if (process.platform === "win32") {
    // Compress-Archive needs the folder contents; wrap in a parent for clean unzip
    const absSource = path.resolve(sourceDir);
    const absZip = path.resolve(zipPath);
    if (fs.existsSync(absZip)) fs.unlinkSync(absZip);
    const ps = spawnSync(
      "powershell",
      [
        "-NoProfile",
        "-Command",
        `Compress-Archive -Path '${absSource}\\*' -DestinationPath '${absZip}' -Force`,
      ],
      { stdio: "inherit" }
    );
    if (ps.status === 0 && fs.existsSync(absZip)) {
      console.log("Zipped with Compress-Archive");
      return;
    }
    console.warn("Compress-Archive failed; using fallback zip writer");
  } else {
    const zip = spawnSync("zip", ["-r", zipPath, "."], {
      cwd: sourceDir,
      stdio: "inherit",
    });
    if (zip.status === 0) return;
  }
  writeStoreZip(sourceDir, zipPath);
  console.log("Zipped with fallback writer");
}

module.exports = { zipSync };

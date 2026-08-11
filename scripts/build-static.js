/**
 * Builds a static HTML export into /out and zips it for client preview upload.
 * Parks the contact API route during the build (unsupported with output: "export").
 */
const { spawnSync } = require("child_process");
const fs = require("fs");
const path = require("path");
const { zipSync } = require("./zip-dir.cjs");

const root = path.join(__dirname, "..");
const routeFile = path.join(root, "app", "api", "contact", "route.ts");
const routePark = path.join(root, "app", "api", "contact", "route.ts.staticbak");
const outDir = path.join(root, "out");
const zipPath = path.join(root, "healthinvest-client-preview.zip");

function run(cmd, args, env = {}) {
  const result = spawnSync(cmd, args, {
    cwd: root,
    env: { ...process.env, ...env },
    stdio: "inherit",
    shell: process.platform === "win32",
  });
  if (result.status !== 0) {
    throw new Error(`${cmd} ${args.join(" ")} failed with code ${result.status}`);
  }
}

function parkApi() {
  if (fs.existsSync(routePark)) fs.unlinkSync(routePark);
  if (fs.existsSync(routeFile)) {
    fs.copyFileSync(routeFile, routePark);
    fs.unlinkSync(routeFile);
    console.log("Parked app/api/contact/route.ts for static export");
  }
}

function restoreApi() {
  if (fs.existsSync(routePark)) {
    fs.copyFileSync(routePark, routeFile);
    fs.unlinkSync(routePark);
    console.log("Restored app/api/contact/route.ts");
  }
}

function main() {
  parkApi();
  try {
    if (fs.existsSync(outDir)) {
      fs.rmSync(outDir, { recursive: true, force: true });
    }
    run("npx", ["next", "build"], { STATIC_EXPORT: "1" });
    if (!fs.existsSync(outDir)) {
      throw new Error("Static export did not produce an out/ directory");
    }
    if (fs.existsSync(zipPath)) fs.unlinkSync(zipPath);
    zipSync(outDir, zipPath);
    console.log("\nStatic preview ready:");
    console.log("  Folder:", outDir);
    console.log("  Zip:   ", zipPath);
    console.log("Upload the zip (or out/ contents) to any static host.");
  } finally {
    restoreApi();
  }
}

try {
  main();
} catch (err) {
  console.error(err);
  restoreApi();
  process.exit(1);
}

const { Resvg } = require("@resvg/resvg-js");
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const src = path.join("public", "icons", "logo-icon.svg");
let svg = fs.readFileSync(src, "utf8");
if (!svg.includes("xmlns=")) {
  svg = svg.replace("<svg", '<svg xmlns="http://www.w3.org/2000/svg"');
}

const resvg = new Resvg(svg, {
  fitTo: { mode: "width", value: 512 },
  background: "rgba(0,0,0,0)",
});
const raw = resvg.render().asPng();
const rawPath = path.join("public", "_favicon-raw.png");
fs.writeFileSync(rawPath, raw);

(async () => {
  await sharp(rawPath)
    .resize(512, 512, {
      fit: "contain",
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .png()
    .toFile(path.join("app", "icon.png"));
  await sharp(path.join("app", "icon.png"))
    .resize(180, 180)
    .toFile(path.join("app", "apple-icon.png"));
  await sharp(path.join("app", "icon.png"))
    .resize(32, 32)
    .toFile(path.join("public", "favicon-32.png"));
  await sharp(path.join("app", "icon.png"))
    .resize(180, 180)
    .toFile(path.join("public", "apple-touch-icon.png"));
  fs.copyFileSync(src, path.join("public", "favicon.svg"));
  fs.unlinkSync(rawPath);
  console.log("Favicon assets updated from logo-icon.svg");
})().catch((e) => {
  console.error(e);
  process.exit(1);
});

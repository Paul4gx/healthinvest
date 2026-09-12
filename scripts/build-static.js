/**
 * Builds a standard Next.js static HTML export for cPanel / shared hosting.
 * Parks the contact API route during the build (unsupported with output: "export").
 * Keeps the default `_next/` asset folder (standard Next.js structure).
 *
 * Outputs (gitignored):
 *   - /out
 *   - healthinvest-static.zip
 *
 * After upload: set directories to 755 and files to 644 (required on many cPanel hosts).
 */
const { spawnSync } = require("child_process");
const fs = require("fs");
const path = require("path");
const { zipSync } = require("./zip-dir.cjs");

const root = path.join(__dirname, "..");
const routeFile = path.join(root, "app", "api", "contact", "route.ts");
const routePark = path.join(root, "app", "api", "contact", "route.ts.staticbak");
const outDir = path.join(root, "out");
const zipPath = path.join(root, "healthinvest-static.zip");

const HTACCESS = `# Health Invest Africa — Apache / cPanel static site
DirectoryIndex index.html
Options -Indexes +FollowSymLinks

<IfModule mod_mime.c>
  AddType text/css .css
  AddType application/javascript .js
  AddType application/javascript .mjs
  AddType image/svg+xml .svg
  AddType image/webp .webp
  AddType font/woff2 .woff2
</IfModule>

<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /

  # Serve Next.js assets as-is
  RewriteRule ^_next/ - [L]

  # Preserve existing files and directories
  RewriteCond %{REQUEST_FILENAME} -f [OR]
  RewriteCond %{REQUEST_FILENAME} -d
  RewriteRule ^ - [L]

  # Legacy path redirects
  RewriteRule ^about-us/?$ /about/ [R=301,L]
  RewriteRule ^about/story/?$ /about/ [R=301,L]
  RewriteRule ^our-operation/?$ /our-operations/ [R=301,L]
  RewriteRule ^operations/?(.*)$ /our-operations/$1 [R=301,L]
  RewriteRule ^our-team/?$ /leadership/ [R=301,L]
  RewriteRule ^team/?$ /leadership/ [R=301,L]
  RewriteRule ^blog/?$ /insights/ [R=301,L]
  RewriteRule ^blog/(.+)/?$ /insights/$1/ [R=301,L]
  RewriteRule ^contact-us/?$ /contact/ [R=301,L]
  RewriteRule ^privacy-policy/?$ /privacy/ [R=301,L]
  RewriteRule ^events/?$ /insights/ [R=301,L]

  # Map clean URLs to folder/index.html when present
  RewriteCond %{REQUEST_FILENAME}.html -f
  RewriteRule ^(.+)$ $1.html [L]

  RewriteCond %{REQUEST_URI} !/$
  RewriteCond %{REQUEST_FILENAME}/index.html -f
  RewriteRule ^(.+)$ $1/ [R=301,L]
</IfModule>

ErrorDocument 404 /404.html
`;

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
    fs.renameSync(routeFile, routePark);
    console.log("Parked app/api/contact/route.ts for static export");
  }
}

function restoreApi() {
  if (fs.existsSync(routePark)) {
    if (fs.existsSync(routeFile)) fs.unlinkSync(routeFile);
    fs.renameSync(routePark, routeFile);
    console.log("Restored app/api/contact/route.ts");
  }
}

function writeHtaccess() {
  fs.writeFileSync(path.join(outDir, ".htaccess"), HTACCESS, "utf8");
  console.log("Wrote out/.htaccess for Apache / cPanel");
}

function main() {
  parkApi();
  try {
    if (fs.existsSync(outDir)) {
      fs.rmSync(outDir, { recursive: true, force: true });
    }
    if (fs.existsSync(zipPath)) {
      fs.unlinkSync(zipPath);
    }
    run("npx", ["next", "build"], { STATIC_EXPORT: "1" });
    if (!fs.existsSync(outDir)) {
      throw new Error("Static export did not produce an out/ directory");
    }
    if (!fs.existsSync(path.join(outDir, "_next"))) {
      throw new Error("Static export missing _next/ assets folder");
    }
    writeHtaccess();
    zipSync(outDir, zipPath);
    console.log("\nStandard static cPanel package ready:");
    console.log("  Folder:", outDir);
    console.log("  Zip:   ", zipPath);
    console.log("  Assets: _next/ (standard Next.js)");
    console.log(
      "Upload out/ contents (or extract the zip) into public_html."
    );
    console.log(
      "Then set directories to 755 and files to 644 (especially _next/)."
    );
    console.log(
      "Note: /api/contact is not available on static hosting; the contact form will not submit."
    );
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

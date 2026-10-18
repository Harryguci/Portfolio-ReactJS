#!/usr/bin/env node
/**
 * Quick deploy: build → vite preview → Cloudflare Quick Tunnel
 * Usage: pnpm deploy:tunnel
 */
import { spawn } from "node:child_process";
import { createRequire } from "node:module";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const PORT = Number(process.env.TUNNEL_PORT || 4173);
const HOST = process.env.TUNNEL_HOST || "127.0.0.1";

const isWin = process.platform === "win32";
const children = [];
let shuttingDown = false;

function spawnProc(command, args, { inherit = true, shell = false } = {}) {
  const child = spawn(command, args, {
    cwd: root,
    shell,
    stdio: inherit ? "inherit" : "pipe",
    env: process.env,
    windowsHide: true,
  });
  children.push(child);
  return child;
}

function run(command, args, options = {}) {
  return new Promise((resolve, reject) => {
    const child = spawnProc(command, args, options);
    child.on("error", reject);
    child.on("exit", (code, signal) => {
      if (signal) reject(new Error(`${command} killed by ${signal}`));
      else if (code !== 0) reject(new Error(`${command} exited with code ${code}`));
      else resolve();
    });
  });
}

function start(command, args, label, options = {}) {
  const child = spawnProc(command, args, options);
  child.on("error", (err) => {
    console.error(`[${label}] failed to start:`, err.message);
    cleanup(1);
  });
  child.on("exit", (code, signal) => {
    if (shuttingDown) return;
    if (signal) {
      console.error(`[${label}] stopped (${signal})`);
      cleanup(1);
      return;
    }
    if (code !== 0 && code !== null) {
      console.error(`[${label}] exited with code ${code}`);
      cleanup(code);
    }
  });
  return child;
}

function cleanup(code = 0) {
  if (shuttingDown) return;
  shuttingDown = true;
  for (const child of children) {
    if (child.exitCode === null && !child.killed) {
      try {
        if (isWin && child.pid) {
          spawn("taskkill", ["/pid", String(child.pid), "/f", "/t"], {
            stdio: "ignore",
            windowsHide: true,
          });
        } else {
          child.kill("SIGTERM");
        }
      } catch {
        // ignore
      }
    }
  }
  process.exit(code);
}

process.on("SIGINT", () => cleanup(0));
process.on("SIGTERM", () => cleanup(0));

async function waitForServer(url, timeoutMs = 60_000) {
  const startAt = Date.now();
  while (Date.now() - startAt < timeoutMs) {
    try {
      const res = await fetch(url);
      if (res.ok || res.status < 500) return;
    } catch {
      // not ready yet
    }
    await new Promise((r) => setTimeout(r, 400));
  }
  throw new Error(`Preview server did not become ready at ${url}`);
}

function resolveBin(pkg, binName) {
  const require = createRequire(import.meta.url);
  const pkgJsonPath = require.resolve(`${pkg}/package.json`);
  const pkgJson = require(pkgJsonPath);
  const binField = pkgJson.bin;
  const rel =
    typeof binField === "string" ? binField : binField?.[binName] ?? binField?.[pkg];
  if (!rel) throw new Error(`Could not resolve bin for ${pkg}`);
  return path.join(path.dirname(pkgJsonPath), rel);
}

async function main() {
  console.log("\n▶ Building production bundle…\n");
  const viteBin = resolveBin("vite", "vite");
  await run(process.execPath, [viteBin, "build"]);

  console.log(`\n▶ Starting preview on http://${HOST}:${PORT} …\n`);
  start(
    process.execPath,
    [viteBin, "preview", "--host", HOST, "--port", String(PORT), "--strictPort"],
    "preview",
  );

  const localUrl = `http://${HOST}:${PORT}/`;
  await waitForServer(localUrl);
  console.log(`\n▶ Preview ready at ${localUrl}`);
  console.log("▶ Opening Cloudflare Quick Tunnel…\n");
  console.log("   Public URL will appear below (*.trycloudflare.com)\n");

  // shell:true so Windows can resolve cloudflared from PATH
  start("cloudflared", ["tunnel", "--url", localUrl], "tunnel", { shell: true });
}

main().catch((err) => {
  console.error("\nDeploy tunnel failed:", err.message);
  cleanup(1);
});

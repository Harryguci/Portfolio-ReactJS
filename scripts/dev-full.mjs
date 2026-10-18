#!/usr/bin/env node
import { spawn } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const isWin = process.platform === "win32";
const children = [];

function start(command, args, label) {
  const child = spawn(command, args, {
    cwd: root,
    shell: isWin,
    stdio: "inherit",
    env: process.env,
  });
  children.push(child);
  child.on("exit", (code) => {
    if (code && code !== 0) {
      console.error(`[${label}] exited with code ${code}`);
      shutdown(code);
    }
  });
}

function shutdown(code = 0) {
  for (const child of children) {
    if (child.exitCode === null && !child.killed) {
      try {
        if (isWin && child.pid) {
          spawn("taskkill", ["/pid", String(child.pid), "/f", "/t"], {
            stdio: "ignore",
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

process.on("SIGINT", () => shutdown(0));
process.on("SIGTERM", () => shutdown(0));

console.log("Starting API + Vite…\n");
start("dotnet", ["run", "--project", "backend/Portfolio.Api/Portfolio.Api.csproj", "--launch-profile", "http"], "api");
start("pnpm", ["dev"], "vite");

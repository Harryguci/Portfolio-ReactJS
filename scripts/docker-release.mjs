/**
 * Build linux/amd64 images locally and push to the registry.
 * Requires: Docker Engine, logged in to the registry, .env with IMAGE_PREFIX.
 *
 * Usage: pnpm docker:release
 *        pnpm docker:release -- 1.0.0
 */
import { spawn } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const tagArg = process.argv[2];

function loadEnvFile(filePath) {
  if (!existsSync(filePath)) return;
  const text = readFileSync(filePath, "utf8");
  for (const line of text.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    let value = trimmed.slice(eq + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    if (process.env[key] === undefined) process.env[key] = value;
  }
}

loadEnvFile(path.join(root, ".env"));

const imagePrefix = process.env.IMAGE_PREFIX;
if (!imagePrefix || imagePrefix === "yourdockerhubusername") {
  console.error(
    "Set IMAGE_PREFIX in .env (e.g. Docker Hub username or ghcr.io/you).",
  );
  process.exit(1);
}

if (tagArg) process.env.IMAGE_TAG = tagArg;
const imageTag = process.env.IMAGE_TAG || "latest";

const composeFiles = ["-f", "docker-compose.yml", "-f", "docker-compose.build.yml"];

function run(args) {
  return new Promise((resolve, reject) => {
    const child = spawn("docker", args, {
      cwd: root,
      stdio: "inherit",
      shell: process.platform === "win32",
      env: process.env,
    });
    child.on("error", reject);
    child.on("exit", (code) => {
      if (code === 0) resolve();
      else reject(new Error(`docker ${args.join(" ")} exited with ${code}`));
    });
  });
}

console.log(`Building & pushing ${imagePrefix}/portfolio-*:${imageTag} (linux/amd64)`);

await run([...composeFiles, "build", "--platform", "linux/amd64"]);
await run([...composeFiles, "push"]);

console.log("Done. On VPS: docker compose pull && docker compose up -d");

#!/usr/bin/env node

import { spawn } from "node:child_process";
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { createServer } from "node:net";
import { basename, extname, join, relative, resolve } from "node:path";

const root = process.cwd();

async function main() {
  console.log("Quality Gate: solo-business LP");

  validateStaticAssets();
  validateComponentLayout();
  validateArchitectureBoundaries();

  await runBin("react-router", ["typegen"]);
  await runBin("tsc", []);
  await runBin("eslint", [
    "--cache",
    "--cache-location",
    "./node_modules/.cache/eslint",
    ".",
  ]);
  await runBin("react-router", ["build"]);

  await runSmokeChecks();

  console.log("Quality Gate passed");
}

function validateStaticAssets() {
  const requiredAssets = ["public/favicon.ico", "public/ogimage.jpg"];

  for (const asset of requiredAssets) {
    const path = resolve(root, asset);

    if (!existsSync(path) || statSync(path).size === 0) {
      throw new Error(`Required LP asset is missing or empty: ${asset}`);
    }
  }
}

function validateComponentLayout() {
  const componentFiles = listFiles(resolve(root, "app/components")).filter(
    (file) => file.endsWith(".tsx"),
  );
  const cssModuleFiles = listFiles(resolve(root, "app/components")).filter(
    (file) => file.endsWith(".module.css"),
  );

  for (const file of componentFiles) {
    const source = readFileSync(file, "utf8");
    const exportedComponents = [
      ...source.matchAll(/export function ([A-Z][A-Za-z0-9_]*)/g),
    ].map((match) => match[1]);

    if (exportedComponents.length > 1) {
      throw new Error(
        `Component file exports multiple React Components: ${relative(root, file)}`,
      );
    }

    if (exportedComponents.length === 1) {
      const fileName = basename(file, extname(file));

      if (exportedComponents[0] !== fileName) {
        throw new Error(
          `Component name must match file name: ${relative(root, file)}`,
        );
      }
    }
  }

  for (const file of cssModuleFiles) {
    const componentPath = file.replace(/\.module\.css$/, ".tsx");

    if (!existsSync(componentPath)) {
      throw new Error(
        `CSS Module must be paired with a same-name Component file: ${relative(
          root,
          file,
        )}`,
      );
    }
  }
}

function validateArchitectureBoundaries() {
  const forbiddenPaths = ["app/services", "app/lib/util.ts"];

  for (const path of forbiddenPaths) {
    if (existsSync(resolve(root, path))) {
      throw new Error(`Forbidden catch-all path exists: ${path}`);
    }
  }

  const appFiles = listFiles(resolve(root, "app")).filter((file) =>
    /\.(ts|tsx)$/.test(file),
  );

  for (const file of appFiles) {
    const rel = relative(root, file);
    const source = readFileSync(file, "utf8");

    if (
      (source.includes("@google-cloud/firestore") ||
        source.includes("@google/genai")) &&
      !rel.startsWith("app/lib/server/infrastructure/")
    ) {
      throw new Error(
        `External SDK import must stay in server infrastructure: ${rel}`,
      );
    }

    if (
      (rel.startsWith("app/components/") ||
        rel.startsWith("app/lib/client/")) &&
      source.includes("~/lib/server")
    ) {
      throw new Error(
        `Client/View code must not import server modules: ${rel}`,
      );
    }
  }
}

async function runSmokeChecks() {
  const port = await findOpenPort();
  const server = spawn(
    process.execPath,
    [
      resolve(root, "node_modules/.bin/react-router-serve"),
      "./build/server/index.js",
    ],
    {
      cwd: root,
      env: { ...process.env, PORT: String(port) },
      stdio: ["ignore", "pipe", "pipe"],
    },
  );

  let serverOutput = "";
  server.stdout.on("data", (chunk) => {
    serverOutput += chunk.toString();
  });
  server.stderr.on("data", (chunk) => {
    serverOutput += chunk.toString();
  });

  const baseUrl = `http://127.0.0.1:${port}`;

  try {
    await waitForServer(`${baseUrl}/api/v1/health`);

    await assertPage(baseUrl, "/", [
      "anaregdesign",
      "データエンジニア ミズカミの個人事務所",
      'property="og:image"',
      "/ogimage.jpg",
      "適格請求書発行事業者登録番号",
    ]);
    await assertPage(baseUrl, "/inquiry", [
      "お問い合わせフォーム",
      "個人情報の取り扱いについて",
    ]);
    await assertPage(baseUrl, "/terms", ["個人情報取扱規約", "利用目的"]);
    await assertPage(baseUrl, "/complete", [
      "お問い合わせありがとうございます",
    ]);

    await assertStatus(`${baseUrl}/favicon.ico`, 200);
    await assertStatus(`${baseUrl}/ogimage.jpg`, 200);

    const health = await fetch(`${baseUrl}/api/v1/health`);
    const healthJson = await health.json();
    if (health.status !== 200 || healthJson.status !== "ok") {
      throw new Error("Health endpoint did not return status ok.");
    }

    const invalidEmail = await fetch(
      `${baseUrl}/api/v1/ai/domains/not-an-email`,
    );
    const invalidEmailBody = await invalidEmail.text();
    if (
      invalidEmail.status !== 400 ||
      !invalidEmailBody.includes("Invalid email")
    ) {
      throw new Error(
        "Invalid email endpoint must fail with a controlled 400.",
      );
    }

    const honeypot = await fetch(`${baseUrl}/api/v1/inquiries`, {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ website: "quality-gate" }),
    });
    if (honeypot.status !== 200) {
      throw new Error(
        "Inquiry honeypot path should return 200 without persistence.",
      );
    }
  } finally {
    server.kill("SIGTERM");
    await waitForExit(server);
  }

  if (server.exitCode && server.exitCode !== 0 && server.exitCode !== null) {
    throw new Error(`Smoke server exited unexpectedly:\n${serverOutput}`);
  }
}

async function assertPage(baseUrl, path, expectedSnippets) {
  const url = `${baseUrl}${path}`;
  const response = await fetch(url);
  const body = await response.text();

  if (response.status !== 200) {
    throw new Error(`${path} returned ${response.status}, expected 200.`);
  }

  for (const snippet of expectedSnippets) {
    if (!body.includes(snippet)) {
      throw new Error(
        `${path} did not contain expected LP content: ${snippet}`,
      );
    }
  }
}

async function assertStatus(url, expectedStatus) {
  const response = await fetch(url);

  if (response.status !== expectedStatus) {
    throw new Error(
      `${url} returned ${response.status}, expected ${expectedStatus}.`,
    );
  }
}

async function waitForServer(url) {
  const deadline = Date.now() + 10_000;

  while (Date.now() < deadline) {
    try {
      const response = await fetch(url);
      if (response.status === 200) {
        return;
      }
    } catch {
      // Retry until the local server is accepting connections.
    }

    await delay(100);
  }

  throw new Error("Timed out waiting for local production server.");
}

async function findOpenPort() {
  return new Promise((resolvePort, reject) => {
    const server = createServer();

    server.once("error", reject);
    server.listen(0, "127.0.0.1", () => {
      const address = server.address();
      server.close(() => {
        if (!address || typeof address === "string") {
          reject(new Error("Failed to allocate a local port."));
          return;
        }

        resolvePort(address.port);
      });
    });
  });
}

async function runBin(binName, args) {
  const binPath = resolve(root, "node_modules/.bin", binName);

  await run(process.execPath, [binPath, ...args], binName);
}

async function run(command, args, label) {
  console.log(`\n> ${label} ${args.join(" ")}`.trimEnd());

  await new Promise((resolveRun, reject) => {
    const child = spawn(command, args, {
      cwd: root,
      env: process.env,
      stdio: "inherit",
    });

    child.on("error", reject);
    child.on("exit", (code) => {
      if (code === 0) {
        resolveRun();
        return;
      }

      reject(new Error(`${label} failed with exit code ${code}`));
    });
  });
}

async function waitForExit(child) {
  if (child.exitCode !== null || child.signalCode !== null) {
    return;
  }

  await new Promise((resolveExit) => child.once("exit", resolveExit));
}

function listFiles(directory) {
  if (!existsSync(directory)) {
    return [];
  }

  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name);

    if (entry.isDirectory()) {
      return listFiles(path);
    }

    return [path];
  });
}

function delay(ms) {
  return new Promise((resolveDelay) => setTimeout(resolveDelay, ms));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

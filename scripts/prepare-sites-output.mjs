import { copyFile, mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";

const root = process.cwd();
const distDir = join(root, "dist");
const hostingSource = join(root, ".openai", "hosting.json");
const hostingTarget = join(distDir, ".openai", "hosting.json");
const serverEntry = join(distDir, "server", "index.js");

await mkdir(dirname(hostingTarget), { recursive: true });
await mkdir(dirname(serverEntry), { recursive: true });
await copyFile(hostingSource, hostingTarget);

await writeFile(
  serverEntry,
  [
    'const htmlExtensions = new Set(["", "/"]);',
    "",
    "function withPath(request, pathname) {",
    "  const url = new URL(request.url);",
    "  url.pathname = pathname;",
    "  return new Request(url, request);",
    "}",
    "",
    "async function fetchAsset(env, request) {",
    "  if (!env?.ASSETS?.fetch) {",
    '    return new Response("Missing static asset binding", { status: 500 });',
    "  }",
    "",
    "  return env.ASSETS.fetch(request);",
    "}",
    "",
    "export default {",
    "  async fetch(request, env) {",
    "    const url = new URL(request.url);",
    "    let response = await fetchAsset(env, request);",
    "",
    "    if (response.status !== 404) return response;",
    "",
    "    const hasExtension = /\\.[^/]+$/.test(url.pathname);",
    "    if (!hasExtension || htmlExtensions.has(url.pathname)) {",
    '      const basePath = url.pathname === "/" ? "/index" : url.pathname.replace(/\\/$/, "");',
    '      response = await fetchAsset(env, withPath(request, `${basePath}.html`));',
    "      if (response.status !== 404) return response;",
    "    }",
    "",
    '    return fetchAsset(env, withPath(request, "/404.html"));',
    "  },",
    "};",
    "",
  ].join("\n"),
  "utf8",
);

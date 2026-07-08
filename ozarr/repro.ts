const JF_URL = "http://localhost:8096";
const MANIFEST_URL = "https://intro-skipper.org/manifest.json";
const REPO_NAME = "Intro Skipper";

const key = (() => {
  const env = require("fs").readFileSync(".env", "utf-8");
  const m = env.match(/^JELLYFIN_API_KEY=(.*)$/m);
  return m ? m[1] : "";
})();

if (!key) {
  console.error("JELLYFIN_API_KEY not found in .env");
  process.exit(1);
}

const headers = { "X-MediaBrowser-Token": key, "Content-Type": "application/json" };

async function get(url: string) {
  const res = await fetch(url, { headers });
  const ct = res.headers.get("content-type") || "";
  const body = ct.includes("json") ? await res.json() : await res.text();
  return { status: res.status, body };
}

async function post(url: string, data?: any) {
  const res = await fetch(url, {
    method: "POST",
    headers,
    body: data !== undefined ? JSON.stringify(data) : undefined,
  });
  const ct = res.headers.get("content-type") || "";
  const body = ct.includes("json") ? await res.json() : await res.text();
  return { status: res.status, body };
}

async function main() {
  // 1. Current state: repos
  console.log("─── CURRENT STATE ───");
  console.log("Repos:", JSON.stringify((await get(`${JF_URL}/Repositories`)).body));

  // 2. Current state: installed plugins
  const installed = (await get(`${JF_URL}/Plugins`)).body as any[];
  console.log("Plugins:", installed.map((p: any) => `${p.Name} [${p.Status}]`).join(", "));

  // 3. POST /Repositories to add Intro Skipper
  console.log("\n─── ADDING REPOSITORY ───");
  const repos = (await get(`${JF_URL}/Repositories`)).body as any[];
  const updated = [...repos, { Name: REPO_NAME, Url: MANIFEST_URL, Enabled: true }];
  const addResult = await post(`${JF_URL}/Repositories`, updated);
  console.log(`POST /Repositories → ${addResult.status}`);
  if (addResult.body && typeof addResult.body === "string" && addResult.body.length > 0) {
    console.log(`body: ${addResult.body}`);
  }

  // 4. Verify repo was added
  console.log("\n─── AFTER ADD ───");
  console.log("Repos:", JSON.stringify((await get(`${JF_URL}/Repositories`)).body));

  // 5. Wait a moment for Jellyfin to fetch the manifest
  console.log("\n--- Waiting 3s for Jellyfin to fetch manifest...");
  await new Promise((r) => setTimeout(r, 3000));

  // 6. Check pending packages (should now include Intro Skipper)
  console.log("\n─── PENDING PACKAGES ───");
  const pending = (await get(`${JF_URL}/Packages?IsPending=true`)).body as any[];
  const introSkipperPkg = pending.find((p: any) => p.name === "Intro Skipper");
  if (introSkipperPkg) {
    console.log(`Intro Skipper found: guid=${introSkipperPkg.guid}, versions=${introSkipperPkg.versions.length}`);
  } else {
    console.log("Intro Skipper NOT found in pending packages. Available:");
    pending.forEach((p: any) => console.log(`  - ${p.name}`));
  }

  // 7. Install the plugin
  console.log("\n─── INSTALLING ───");
  const installUrl = `${JF_URL}/Packages/Installed/Intro%20Skipper?assemblyGuid=c83d86bb-a1e0-4c35-a113-e2101cf4ee6b&repositoryUrl=${encodeURIComponent(MANIFEST_URL)}`;
  const installResult = await post(installUrl);
  console.log(`POST /Packages/Installed/Intro%20Skipper → ${installResult.status}`);
  if (installResult.body && typeof installResult.body === "string" && installResult.body.length > 0) {
    console.log(`body: ${installResult.body}`);
  }

  // 8. Verify installed
  console.log("\n─── AFTER INSTALL ───");
  const installed2 = (await get(`${JF_URL}/Plugins`)).body as any[];
  console.log("Plugins:", installed2.map((p: any) => `${p.Name} [${p.Status}]`).join(", "));
}

main().catch(console.error);

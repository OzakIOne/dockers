import { $ } from "bun"
import { readFile, writeFile, mkdir, access } from "node:fs/promises"
import { existsSync } from "node:fs"
import { join } from "node:path"

const SPECS_DIR = "./services/__generated"
const CACHE_DIR = `${SPECS_DIR}/.specs`

const specs: Array<{
  name: string
  url?: string
  local?: string
  ext: string
  endpoint?: string
  validateSide?: string
  patch?: (fetcher: string) => string
}> = [
  {
    name: "sonarr",
    url: "https://raw.githubusercontent.com/Sonarr/Sonarr/refs/heads/v5-develop/src/Sonarr.Api.V5/openapi.json",
    ext: "json",
    endpoint: "^/api/v5/(rootfolder|settings/mediamanagement|downloadclient)(/|$)",
    validateSide: "none",
  },
  {
    name: "radarr",
    url: "https://raw.githubusercontent.com/Radarr/Radarr/develop/src/Radarr.Api.V3/openapi.json",
    ext: "json",
    endpoint: "^/api/v3/(rootfolder|config/mediamanagement|downloadclient)(/|$)",
    validateSide: "none",
  },
  {
    name: "prowlarr",
    url: "https://raw.githubusercontent.com/Prowlarr/Prowlarr/develop/src/Prowlarr.Api.V1/openapi.json",
    ext: "json",
    endpoint: "^/api/v1/(applications|indexer|downloadclient)(/|$)",
    validateSide: "none",
  },
  {
    name: "seerr",
    url: "https://raw.githubusercontent.com/seerr-team/seerr/refs/heads/develop/seerr-api.yml",
    ext: "yaml",
    endpoint: "^/status$|^/settings/(sonarr|radarr)(/|$)",
    validateSide: "none",
  },
  {
    name: "jellyfin",
    url: "https://api.jellyfin.org/openapi/jellyfin-openapi-stable.json",
    ext: "json",
    endpoint: "^(GetSystemInfo|GetUsers|GetRepositories|SetRepositories|InstallPackage)$",
    patch: (fetcher) =>
      fetcher.replace(
        'headers.set("Authorization", auth["CustomAuthentication"]!)',
        'headers.set("X-MediaBrowser-Token", auth["CustomAuthentication"]!)',
      ),
  },
  {
    name: "homarr",
    url: "https://raw.githubusercontent.com/homarr-labs/homarr/refs/heads/dev/apps/docs/static/api/open-api-schema.json",
    ext: "json",
    endpoint: "^(appRouter-(create|all))$",
  },
  {
    name: "qui",
    url: "https://raw.githubusercontent.com/autobrr/qui/refs/heads/develop/internal/web/swagger/openapi.yaml",
    ext: "yaml",
  },
  {
    name: "maintainerr",
    url: "https://raw.githubusercontent.com/Maintainerr/Maintainerr_docs/refs/heads/main/static/openapi-spec/maintainerr_api_specs.yaml",
    ext: "yaml",
  },
]

const force = Bun.argv.includes("--force") || Bun.argv.includes("-f")

await mkdir(CACHE_DIR, { recursive: true })

for (const { name, url, local, ext, endpoint, validateSide, patch } of specs) {
  const cachePath = `${CACHE_DIR}/${name}.${ext}`

  if (!force && existsSync(cachePath)) {
    console.log(`=== ${name} (cached) ===`)
  } else {
    console.log(`=== ${name} ===`)
    if (local) {
      await $`cp ${join(SPECS_DIR, local)} ${cachePath}`
    } else if (url) {
      await $`curl -sL ${url} -o ${cachePath}`
    }
  }

  let args = [
    cachePath,
    "--runtime", "effect",
    "--client", "effect",
    "--default-fetcher", `${name}-fetcher`,
    "--output", `${SPECS_DIR}/${name}.ts`,
    "--coerce",
  ]
  if (validateSide) args.push("--validate-side", validateSide)
  if (endpoint) args.push("--endpoint", endpoint)

  await $`bunx typed-openapi ${args}`

  const outPath = `${SPECS_DIR}/${name}.ts`
  let outContent = await readFile(outPath, "utf-8")
  outContent = outContent.replace(
    /\.mapFields\(Struct\.assign\(\(Schema\.Literals\(\[.*?\]\)\)\.fields\)\)/g,
    "",
  )
  outContent = outContent.replace(
    /(\/\/ <DefaultSchemas>[\s\S]*?\/\/ <\/DefaultSchemas>)/g,
    (block) => block.replace(
      /Schema\.Array\((\w+)\)/g,
      "Schema.Array(Schema.suspend(() => $1))",
    ),
  )
  await writeFile(outPath, outContent)
  console.log(`  fixed mapFields + reordered defaults in ${name}.ts`)

  if (patch) {
    const fetcherPath = `${SPECS_DIR}/${name}-fetcher`
    const content = await readFile(fetcherPath, "utf-8")
    await writeFile(fetcherPath, patch(content))
    console.log(`  patched ${name}-fetcher`)
  }
}

console.log("\nDone.")

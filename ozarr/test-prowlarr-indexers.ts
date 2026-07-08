const apiKey = Bun.env.PROWLARR_API_KEY
if (!apiKey) {
  console.error("PROWLARR_API_KEY not found in .env")
  process.exit(1)
}

const url = `http://localhost:9696/api/v1/indexer`

console.log(`Fetching ${url} ...`)

const response = await fetch(url, {
  headers: { "X-Api-Key": apiKey },
})

if (!response.ok) {
  console.error(`HTTP ${response.status}: ${await response.text()}`)
  process.exit(1)
}

const indexers = await response.json()
console.log(`\n${indexers.length} indexers found:\n`)

for (const idx of indexers) {
  console.log(`  - ${idx.name}`)
  console.log(`    id: ${idx.id}`)
  console.log(`    enableRss: ${idx.enableRss}`)
  console.log(`    enableAutomaticSearch: ${idx.enableAutomaticSearch}`)
  console.log(`    enableInteractiveSearch: ${idx.enableInteractiveSearch}`)
  console.log(`    priority: ${idx.priority}`)
  console.log()
}

console.log(JSON.stringify(indexers, null, 2))

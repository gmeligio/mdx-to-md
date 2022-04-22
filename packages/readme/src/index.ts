import { writeFile } from "fs/promises"
import { mdxToMd } from "mdx-to-md"
import { watch } from "chokidar"

const sourceReadme = "../mdx-to-md/README.mdx"

async function build() {
  const markdown = await mdxToMd(sourceReadme)
  const banner = `This README was auto-generated from "packages/mdx-to-mdx/README.mdx" using "yarn build:readme"`
  const readme = `<!--- ${banner} --> \n\n ${markdown}`

  writeFile("../mdx-to-md/README.md", readme).then(() => {
    console.log("📝 Converted README.mdx -> README.md")
  })
}

if (process.argv.includes("--watch")) {
  watch(sourceReadme).on("change", build)
} else {
  build()
}

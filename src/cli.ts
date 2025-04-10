#!/usr/bin/env node
import { basename, resolve } from "node:path"
import { writeFile } from "node:fs/promises"
import { watch } from "chokidar"
import { args, flags } from "args-flags"

import { mdxToMd } from "./mdx-to-md.js"

const [sourcePath, outPath = basename(sourcePath).slice(0, -1)] = args
const sourceMDX = resolve((flags.cwd as string) ?? process.cwd(), sourcePath)

async function build() {
  const markdown = await mdxToMd(sourceMDX)
  const banner = `This markdown file was auto-generated from "${sourcePath}"`
  const contents = `<!--- ${banner} -->\n\n${markdown}`

  await writeFile(outPath, contents)

  console.log(`📝 Converted ${sourcePath} -> ${outPath}`)
}

if (flags.watch) {
  watch(sourceMDX).on("change", build)
} else {
  build()
}

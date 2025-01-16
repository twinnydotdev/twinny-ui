// src/routes/blog/+page.server.ts
import * as fs from 'fs'

function parseFrontmatter(content: string) {
  const frontmatterRegex = /---\n([\s\S]*?)\n---/
  const match = content.match(frontmatterRegex)

  if (!match) return null

  const frontmatter = match[1]
  const attributes: Record<string, string> = {}

  frontmatter.split('\n').forEach((line) => {
    const [key, ...valueParts] = line.split(':')
    if (key && valueParts) {
      attributes[key.trim()] = valueParts.join(':').trim()
    }
  })

  const contentAfterFrontmatter = content.replace(frontmatterRegex, '').trim()

  return {
    attributes,
    content: contentAfterFrontmatter
  }
}

export async function load() {
  const posts = fs
    .readdirSync('src/posts')
    .filter((file) => file.endsWith('.md'))
    .map((file) => {
      const content = fs.readFileSync(`src/posts/${file}`, 'utf-8')
      const parsed = parseFrontmatter(content)

      if (!parsed) {
        throw new Error(`Invalid frontmatter in ${file}`)
      }

      const { attributes } = parsed

      return {
        slug: file.replace('.md', ''),
        title: attributes.title || 'Untitled',
        date: attributes.date || new Date().toISOString().split('T')[0],
        excerpt: attributes.excerpt || parsed.content.slice(0, 160) + '...',
        readingTime: attributes.readingTime || Math.ceil(parsed.content.split(' ').length / 180)
      }
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()) // Sort by date descending

  return { posts }
}

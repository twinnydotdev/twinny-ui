import { error } from '@sveltejs/kit'
import * as fs from 'fs'
import { Marked } from 'marked'
import { markedHighlight } from 'marked-highlight'
import hljs from 'highlight.js'
import type { PageServerLoad } from '../$types'
import matter from 'gray-matter'

const marked = new Marked(
  markedHighlight({
    langPrefix: 'hljs language-',
    highlight(code, lang) {
      const language = hljs.getLanguage(lang) ? lang : 'plaintext'
      return hljs.highlight(code, { language }).value
    }
  })
)

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const load = (({ params }: any) => {
  try {
    const content = fs.readFileSync(`src/posts/${params.slug}.md`, 'utf-8')

    const { data: frontmatter, content: markdownContent } = matter(content)

    const html = marked.parse(markdownContent)

    console.log(html)

    return {
      html,
      title: frontmatter.title,
      date: frontmatter.date,
      excerpt: frontmatter.excerpt,
      readingTime: frontmatter.readingTime,
      content,
      ...frontmatter
    }
  } catch (e) {
    console.error(e)
    throw error(404, 'Post not found')
  }
}) satisfies PageServerLoad

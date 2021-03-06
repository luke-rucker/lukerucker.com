import { marked } from 'marked'
import sanitizeHtml from 'sanitize-html'

export const convertToHtml = (markdown: string) =>
  sanitizeHtml(marked(markdown), {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img']),
  })

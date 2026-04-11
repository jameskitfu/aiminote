import DOMPurify from 'dompurify';

const sanitizeArticleHtml = (html: string) =>
  DOMPurify.sanitize(html, {
    ALLOWED_TAGS: [
      'a',
      'blockquote',
      'br',
      'code',
      'em',
      'h1',
      'h2',
      'h3',
      'h4',
      'h5',
      'h6',
      'img',
      'li',
      'ol',
      'p',
      'pre',
      'strong',
      'ul',
    ],
    ALLOWED_ATTR: ['href', 'target', 'rel', 'src', 'alt', 'title'],
  });

export const renderMarkdownToHtml = (markdown: string) => {
  let text = markdown || '';
  const escape = (value: string) =>
    value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

  text = text.replace(
    /```([\s\S]*?)```/g,
    (_, code) =>
      `<pre class="p-4 rounded-2xl bg-slate-900 text-slate-100 overflow-x-auto"><code>${escape(code)}</code></pre>`
  );
  text = text.replace(/^###\s+(.*)$/gm, '<h3>$1</h3>');
  text = text.replace(/^##\s+(.*)$/gm, '<h2>$1</h2>');
  text = text.replace(/^#\s+(.*)$/gm, '<h1>$1</h1>');
  text = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  text = text.replace(/\*(.*?)\*/g, '<em>$1</em>');
  text = text.replace(
    /\[(.*?)\]\((.*?)\)/g,
    '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>'
  );

  const html = text
    .split(/\n\n+/)
    .map((block) => {
      if (/^<h\d|<pre/.test(block)) {
        return block;
      }
      return `<p>${block.replace(/\n/g, '<br/>')}</p>`;
    })
    .join('\n');

  return sanitizeArticleHtml(html);
};

export const toSafeArticleHtml = (html: string) => sanitizeArticleHtml(html);

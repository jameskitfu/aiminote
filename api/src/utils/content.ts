import sanitizeHtml from 'sanitize-html';

const ARTICLE_ALLOWED_TAGS = [
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
];

const ARTICLE_ALLOWED_ATTRIBUTES: sanitizeHtml.IOptions['allowedAttributes'] = {
  a: ['href', 'target', 'rel'],
  img: ['src', 'alt', 'title'],
};

export const sanitizeArticleContent = (content: string): string =>
  sanitizeHtml(content, {
    allowedTags: ARTICLE_ALLOWED_TAGS,
    allowedAttributes: ARTICLE_ALLOWED_ATTRIBUTES,
    allowedSchemes: ['http', 'https', 'mailto'],
    transformTags: {
      a: sanitizeHtml.simpleTransform('a', {
        rel: 'noopener noreferrer',
        target: '_blank',
      }),
    },
  });

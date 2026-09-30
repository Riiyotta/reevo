// Rich-text fields in data.js are trusted static HTML (strong / a / &nbsp; widow fixes).
export function Html({ as: Tag = 'span', html, ...rest }) {
  return <Tag {...rest} dangerouslySetInnerHTML={{ __html: html }} />
}

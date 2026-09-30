import './prose.css'

// Rich-text wrapper: same element/class contract as the original `.prose` block.
export default function Prose({ as: Tag = 'div', className = '', children, ...rest }) {
  return (
    <Tag className={`reevo-prose ${className}`} {...rest}>
      {children}
    </Tag>
  )
}

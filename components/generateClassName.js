import crypto from 'crypto'

export default function generateClassName(rule, sheet) {
  const { style } = rule
  const hash = crypto.createHash('sha256')
  hash.update(JSON.stringify(style || {}))
  const short = hash
    .digest('base64')
    .replace(/[^\w]/g, '')
    .substring(0, 8)
  return 'j' + short
}

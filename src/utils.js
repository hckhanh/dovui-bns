export function extractQuestion(content) {
  return content
    .split('\n')
    .map(line => line.trim())
    .filter(line => line.endsWith('?') === true)
    .map(question => ({ question }))
}
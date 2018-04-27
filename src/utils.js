export function extractQuestion(content) {
  const line = content.split('\n').map(line => line.trim())
  const markIndex = line.indexOf('CÂU HỎI')
  const questionContents = line.slice(markIndex + 1, markIndex + 11)

  return questionContents
    .filter((line, index) => index % 2 !== 0)
    .map(question => ({ question }))
}

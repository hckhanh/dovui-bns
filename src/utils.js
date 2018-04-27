export function extractQuestion(content) {
  const line = content.split('\n').map(line => line.trim())
  const markIndex = line.indexOf('CÂU HỎI')

  if (markIndex > -1) {
    const questionContents = line.slice(markIndex + 1, markIndex + 11)

    return questionContents
      .filter((line, index) => index % 2 !== 0)
      .map(question => ({ question }))
  } else {
    return line
      .filter(line => line.endsWith('?') === true)
      .map(question => ({ question }))
  }
}

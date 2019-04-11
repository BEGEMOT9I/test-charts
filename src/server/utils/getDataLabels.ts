export default function(count: number): Array<string> {
  const labels = []
  let begin = new Date(2019, 0, 1).getTime()

  for (let i = count; i > 0; i -= 1) {
    begin -= 1000 * 60 * 60

    const date = new Date(begin)

    labels.push(`${date.getFullYear()}-${date.getMonth()}-${date.getDate()}-${date.getHours()}`)
  }

  return labels
}

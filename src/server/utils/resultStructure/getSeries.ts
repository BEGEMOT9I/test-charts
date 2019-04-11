import { Series } from './index'

export default function(seriesCount: number): Series {
  const series = []

  for (let seriaIndex = 0; seriaIndex < seriesCount; seriaIndex += 1) {
    series.push({
      name: `seria-${seriaIndex}`
    })
  }

  return series
}

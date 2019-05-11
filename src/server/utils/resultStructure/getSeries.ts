import { getSeriaName } from './getName'
import { Series } from './index'

export default function getSeries(seriesCount: number): Series {
  const series = []

  for (let seriaIndex = 0; seriaIndex < seriesCount; seriaIndex += 1) {
    series.push({
      name: getSeriaName(seriaIndex)
    })
  }

  return series
}

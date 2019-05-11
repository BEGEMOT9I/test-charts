import { getItemInfoByName } from './getName'
import { NestedArray, Series, Levels, IncapsulatedDataset } from './index'

function createNestedSeria(
  series: Series,
  levels: Levels,
  level: number,
  labelsArray: Array<string>
): NestedArray<number> {
  const levelConfig = levels[level]

  if (level < levels.length - 1) {
    return levelConfig.labels.map((label, index) =>
      createNestedSeria(series, levels, level + 1, labelsArray.concat(label))
    ) as NestedArray<number>
  }

  const valueBasedOnParentArray = labelsArray.reduce((result, label, levelReverseIndex) => {
    const index = getItemInfoByName(label) * 10 ** (labelsArray.length - levelReverseIndex)

    return result + index
  }, 0)

  return levelConfig.labels.map((label, index) =>
    Math.abs(Math.sin(valueBasedOnParentArray + index))
  )
}

export default function getData(series: Series, levels: Levels): IncapsulatedDataset<number> {
  const dataset: IncapsulatedDataset<number> = []

  series.forEach((seria, index) => {
    dataset.push(createNestedSeria(series, levels, 0, [series[index].name]))
  })

  return dataset
}

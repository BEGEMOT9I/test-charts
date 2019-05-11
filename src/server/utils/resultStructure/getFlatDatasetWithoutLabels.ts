import { getItemInfoByName } from './getName'
import { Series, Levels, FlatDatasetWithoutLabels } from './index'

function createNestedSeria(
  dataset: FlatDatasetWithoutLabels<number>,
  series: Series,
  levels: Levels,
  level: number,
  seria: Array<number>
) {
  const levelConfig = levels[level]

  if (level < levels.length - 1) {
    levelConfig.labels.forEach((label, index) =>
      createNestedSeria(dataset, series, levels, level + 1, seria.concat(index))
    )
    return
  }

  const valueBasedOnParentArray = seria.reduce(
    (result, levelOrSeriaDataIndex, levelOrSeriaIndex) => {
      const label = levelOrSeriaIndex
        ? levels[levelOrSeriaIndex - 1].labels[levelOrSeriaDataIndex]
        : series[levelOrSeriaDataIndex].name
      const index = getItemInfoByName(label) * 10 ** (seria.length - levelOrSeriaIndex)

      return result + index
    },
    0
  )

  dataset.push(
    levelConfig.labels.map((label, index) => Math.abs(Math.sin(valueBasedOnParentArray + index)))
  )
}

export default function getData(series: Series, levels: Levels): FlatDatasetWithoutLabels<number> {
  const dataset: FlatDatasetWithoutLabels<number> = []

  series.forEach((seria, index) => {
    createNestedSeria(dataset, series, levels, 0, [index])
  })

  return dataset
}

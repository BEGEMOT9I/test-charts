import { Series, Levels, FlatDatasetWithoutLabels } from './index'

function createNestedSeria(dataset: FlatDatasetWithoutLabels<number>, series: Series, levels: Levels, level: number, seria: Array<number>) {
  if (level) {
    levels[levels.length - level - 1].labels.forEach((label, index) => createNestedSeria(dataset, series, levels, level - 1, seria.concat(index)))
    return
  }

  const valueBasedOnParentArray = seria.reduce((result, levelOrSeriaDataIndex, levelOrSeriaIndex) => {
    const label = levelOrSeriaIndex ? levels[levelOrSeriaIndex - 1].labels[levelOrSeriaDataIndex] : series[levelOrSeriaDataIndex].name
    const index = Number((label.match(/(index|seria)-(\d+)$/) as Array<string>)[2]) * 10 ** (seria.length - levelOrSeriaIndex)

    return result + index
  }, 0)

  dataset.push(levels[level].labels.map((label, index) => Math.sin(valueBasedOnParentArray + index)))
}

export default function (series: Series, levels: Levels): FlatDatasetWithoutLabels<number> {
  const dataset: FlatDatasetWithoutLabels<number> = []

  series.forEach((seria, index) => {
    createNestedSeria(dataset, series, levels, levels.length - 1, [index])
  })

  return dataset
}
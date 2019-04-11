import { NestedArray, Series, Levels, IncapsulatedDataset } from './index'

function createNestedSeria(
  series: Series,
  levels: Levels,
  level: number,
  labelsArray: Array<string>
): NestedArray<number> {
  if (level) {
    return levels[levels.length - level - 1].labels.map((label, index) =>
      createNestedSeria(series, levels, level - 1, labelsArray.concat(label))
    ) as NestedArray<number>
  }

  const valueBasedOnParentArray = labelsArray.reduce((result, label, levelReverseIndex) => {
    const index =
      Number((label.match(/(index|seria)-(\d+)$/) as Array<string>)[2]) *
      10 ** (labelsArray.length - levelReverseIndex)

    return result + index
  }, 0)

  return levels[level].labels.map((label, index) =>
    Math.abs(Math.sin(valueBasedOnParentArray + index))
  )
}

export default function(series: Series, levels: Levels): IncapsulatedDataset<number> {
  const dataset: IncapsulatedDataset<number> = []

  series.forEach((seria, index) => {
    dataset.push(createNestedSeria(series, levels, levels.length - 1, [series[index].name]))
  })

  return dataset
}

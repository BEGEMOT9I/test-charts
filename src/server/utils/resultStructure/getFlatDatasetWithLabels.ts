import getDataLabels from '../getDataLabels'
import { FlatDatasetWithLabels } from './index'

function createNestedSeria(dataset: Array<Array<number | string>>, parentArray: Array<number | string>, levelsDataCount: Array<number>, level: number) {
  const levelDataCount = levelsDataCount[level]

  if (level) {
    for (let i = 0; i < levelDataCount; i += 1) {
      createNestedSeria(dataset, [...parentArray, `level-${level}-index-${i}`], levelsDataCount, level - 1)
    }
  } else {
    const valueBasedOnParentArray = (parentArray as Array<string>).reduce((result, label, labelIndex) => {
      const index = Number((label.match(/(index|seria)-(\d+)$/) as Array<string>)[2]) * 10 ** (parentArray.length - labelIndex)
      return result + index
    }, 0)

    for (let i = 0; i < levelDataCount; i += 1) {
      parentArray.push(Math.sin(valueBasedOnParentArray + i))
    }
    dataset.push(parentArray)
  }
}

export default function (seriesCount: number, levelsDataCount: Array<number>): FlatDatasetWithLabels<number, string> {
  const dataset: Array<Array<number | string>> = []

  let labels = ["Series"]

  for (let level = levelsDataCount.length - 1; level > 0; level -= 1) {
    labels.push(`level-${level}`)
  }

  labels = labels.concat(getDataLabels(levelsDataCount[0]))
  dataset.push(labels)

  for (let i = 0; i < seriesCount; i += 1) {
    createNestedSeria(dataset, [`seria-${i}`], levelsDataCount, levelsDataCount.length - 1)
  }

  return dataset
}
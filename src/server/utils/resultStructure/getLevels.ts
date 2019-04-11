import getDataLabels from '../getDataLabels'
import { Levels } from './index'

export default function(levelsDataCount: Array<number>): Levels {
  const levels = []

  for (let level = levelsDataCount.length - 1; level > -1; level -= 1) {
    const levelObject: {
      name: string
      labels: Array<string>
    } = {
      name: `level-${level}`,
      labels: []
    }

    if (level) {
      for (let levelDataIndex = 0; levelDataIndex < levelsDataCount[level]; levelDataIndex += 1) {
        levelObject.labels.push(`level-${level}-index-${levelDataIndex}`)
      }
    } else {
      levelObject.labels = getDataLabels(levelsDataCount[level])
    }

    levels.push(levelObject)
  }

  return levels
}

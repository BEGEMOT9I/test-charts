import { ENDPOINT } from '../../constants/api'

interface Level {
  name: string
  labels: Array<string>
}

interface Seria {
  name: string
}
export type Levels = Array<Level>
export type Series = Array<Seria>
export type FlatDatasetWithoutLabels<ValueType> = Array<Array<ValueType>>
export interface BasedData {
  series: Series
  levels: Levels
  dataset: FlatDatasetWithoutLabels<number>
}
export type FormattedDataset = Array<Array<string | number>>

class DataService {
  public async getDataset(options: { seriesCount: number; levelsDataCount: Array<number> }) {
    try {
      const response = await fetch(`${location.origin}/${ENDPOINT.DATASET}`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(options)
      })
      return this.format2DDataset((await response.json()) as BasedData)
    } catch (error) {
      console.error(error)
      return []
    }
  }

  public format2DDataset(data: BasedData): FormattedDataset {
    const dataset = []
    const header = ['Graph'].concat(data.levels[data.levels.length - 1].labels)

    dataset.push(header)

    data.dataset.forEach((values, valuesIndex) => {
      const seria: Array<string | number> = [data.series[valuesIndex].name]

      data.levels.slice(0, data.levels.length - 1).forEach((level, levelIndex) => {
        const levelLabel = level.labels[valuesIndex % level.labels.length]

        seria[0] += `-${levelLabel}`
      })

      dataset.push(seria.concat(values))
    })

    return dataset
  }
}

export default new DataService()

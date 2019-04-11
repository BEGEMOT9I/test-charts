import * as express from 'express'

import {
  getLevels,
  getSeries,
  getIncapsulatedDataset,
  Result,
  IncapsulatedDataset
} from '../utils/resultStructure'

function nestedDataController(req: express.Request, res: express.Response) {
  try {
    const {
      seriesCount = 1,
      levelsDataCount = [1, 1]
    }: {
      seriesCount: number
      levelsDataCount: number[]
    } = req.body

    // Structure:
    // {
    //   series: Array<{
    //     name: <Name of seria>
    //   }>
    //   levels: Array<{
    //     name: <Name of level>
    //     labels: Array<<Level labels>>
    //   }>
    //   dataset: [
    //     [...<<seria> array>], - count of elements = seriesCount, where:
    //     <<seria> array> = [...<<level> array>], - count of elements = levelsDataCount[level], where:
    //     <<level> array> = [...<<level - 1> array>]
    //   ]
    // }

    const series = getSeries(seriesCount)
    const levels = getLevels(levelsDataCount)
    const dataset = getIncapsulatedDataset(series, levels)

    const resultStructure: Result<IncapsulatedDataset<number>> = {
      series,
      levels,
      dataset
    }

    res.json(resultStructure)
  } catch (error) {
    console.log(error)
    res.json({
      error: (error as Object).toString()
    })
  }
}

export default nestedDataController

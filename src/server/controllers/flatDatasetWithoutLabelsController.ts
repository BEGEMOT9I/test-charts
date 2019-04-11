import * as express from 'express'

import { getLevels, getSeries, getFlatDatasetWithoutLabels, Result, FlatDatasetWithoutLabels } from '../utils/resultStructure'

function flatDatasetWithoutLabelsController(req: express.Request, res: express.Response) {
  try {
    const {
      seriesCount = 1, levelsDataCount = [1, 1]
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
    //     [...<Levels-indicies array (length = levelsDataCount.length)>, ...[Data values (length = levelsDataCount[0])]], - count of the rows = seriesCount * (<each level data count (except the zero level)>)
    //     ...e.t.c
    //   ]
    // }

    const series = getSeries(seriesCount)
    const levels = getLevels(levelsDataCount)
    const dataset = getFlatDatasetWithoutLabels(series, levels)

    const resultStructure: Result<FlatDatasetWithoutLabels<number>> = {
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

export default flatDatasetWithoutLabelsController
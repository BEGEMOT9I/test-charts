import * as express from 'express'

import { getFlatDatasetWithLabels } from '../utils/resultStructure'

function flatDatasetWithLabelsController(req: express.Request, res: express.Response) {
  try {
    const {
      seriesCount = 1,
      levelsDataCount = [1, 1]
    }: {
      seriesCount: number
      levelsDataCount: number[]
    } = req.body

    // Structure:
    // [
    //   [ "Series", ...[<Levels-naming array (length = levels.length)>], ...[<Labels array (length = dataCount)>] ],
    //   [ <Name of the seria>, ...[<Levels-values array (length = levels.length)>], ...[Data values (length = levelsDataCount[0])] ], - count of the rows = seriesCount * (<each level data count (except the zero level)>)
    //   ...e.t.c.
    // ]

    res.json({
      dataset: getFlatDatasetWithLabels(seriesCount, levelsDataCount)
    })
  } catch (error) {
    console.log(error)
    res.json({
      error: (error as Object).toString()
    })
  }
}

export default flatDatasetWithLabelsController

import * as express from 'express'
import * as path from 'path'
import * as bodyParser from 'body-parser'
import * as fetch from 'node-fetch'

const app = express()

app.use(bodyParser.json())
app.use('/assets', express.static(path.resolve(__dirname, '../../public/webpack')))

app.get('/', function(req: express.Request, res: express.Response) {
  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <title>Page Title</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        <div id="root"></div>
        <script src="assets/client.js"></script>
      </body>
    </html>
  `)
})

// Flat data with labels in dataset
app.post('/flat-data-with-labels', function(req: express.Request, res: express.Response) {
  try {
    const dataset: Array<Array<number | string>> = []
    const {
      seriesCount = 1, levelsDataCount = [1, 1]
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

    const labels = ["Series"]

    for (let level = levelsDataCount.length - 1; level > 0; level -= 1) {
      labels.push(`Level-${level}`)
    }

    let begin = new Date(2019, 0, 1).getTime()

    for (let i = levelsDataCount[0]; i > 0; i -= 1) {
      begin -= 1000 * 60 * 60
      const date = new Date(begin)
      labels.push(`${date.getFullYear()}-${date.getMonth()}-${date.getDate()}-${date.getHours()}`)
    }

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

    dataset.push(labels)

    for (let i = 0; i < seriesCount; i += 1) {
      createNestedSeria(dataset, [`seria-${i}`], levelsDataCount, levelsDataCount.length - 1)
    }

    res.json({
      dataset
    })
  } catch (error) {
    console.log(error)
    res.json({
      error: (error as Object).toString()
    })
  }
})

// Flat data without labels in dataset and with levels labels
app.post('/flat-data-without-labels', function(req: express.Request, res: express.Response) {
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

    interface Result {
      series: Array<{
        name: string
      }>
      levels: Array<{
        name: string
        labels: Array<string>
      }>
      dataset: Array<Array<number>>
    }
    const resultStructure: Result = {
      series: [],
      levels: [],
      dataset: []
    }

    for (let seriaIndex = 0; seriaIndex < seriesCount; seriaIndex += 1) {
      resultStructure.series.push({
        name: `seria-${seriaIndex}`
      })
    }

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
        let begin = new Date(2019, 0, 1).getTime()
    
        for (let i = levelsDataCount[level]; i > 0; i -= 1) {
          begin -= 1000 * 60 * 60
          const date = new Date(begin)
          levelObject.labels.push(`${date.getFullYear()}-${date.getMonth()}-${date.getDate()}-${date.getHours()}`)
        }
      }

      resultStructure.levels.push(levelObject)
    }

    function createNestedSeria(resultStructure: Result, parentArray: Array<number>, levelsDataCount: Array<number>, level: number) {
      const levelDataCount = levelsDataCount[level]

      if (level) {
        for (let i = 0; i < levelDataCount; i += 1) {
          createNestedSeria(resultStructure, [...parentArray, i], levelsDataCount, level - 1)
        }
      } else {
        const valueBasedOnParentArray = parentArray.slice(1, parentArray.length).reduce((result, levelDataIndex, levelReverseIndex) => {
          const label = resultStructure.levels[levelReverseIndex].labels[levelDataIndex]
          const index = Number((label.match(/(index|seria)-(\d+)$/) as Array<string>)[2]) * 10 ** (parentArray.length - levelReverseIndex)

          return result + index
        }, 0)

        for (let i = 0; i < levelDataCount; i += 1) {
          parentArray.push(Math.sin(valueBasedOnParentArray + i))
        }
        resultStructure.dataset.push(parentArray)
      }
    }

    for (let i = 0; i < seriesCount; i += 1) {
      createNestedSeria(resultStructure, [i], levelsDataCount, levelsDataCount.length - 1)
    }

    res.json(resultStructure)
  } catch (error) {
    console.log(error)
    res.json({
      error: (error as Object).toString()
    })
  }
})

app.get(/\/test\/.+/, async function(req: express.Request, res: express.Response) {
  try {
    const pathToTest = (req.path.match(/^\/test\/(.+)$/) as Array<string>)[1]
    const response = await fetch(`${req.protocol}://${req.hostname}:3000/${pathToTest}`, {  
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        seriesCount: 10,
        levelsDataCount: [10, 10]
      })
    })
    const data = await response.json()

    res.json(data)
  } catch(error) {
    console.log(error)
    res.json({
      error
    })
  }
})

app.listen(3000)

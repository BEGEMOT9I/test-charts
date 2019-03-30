import * as express from 'express'
import * as path from 'path'

const app = express()

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

app.get('/data', function(req: express.Request, res: express.Response) {
  try {
    const dataset: Array<Array<number | string>> = []
    const {
      seriesCount: querySeriesCount = 1, dataCount: queryDataCount = 1, levelsCount: queryLevelsCount = 2
    } = req.query
    const params = [Number(querySeriesCount), Number(queryDataCount), Number(queryLevelsCount)]

    if (params.some(param => typeof param !== 'number')) {
      throw new Error('All params must be a valid number')
    }

    // Structure:
    // [
    //   [ ...[<Levels-naming array (length = levelsCount - 1)>], ...[<Labels array (length = dataCount)>] ],
    //   [ ...[<Levels-indices array>], ...[Data values] ], - count = seriesCount * (levelsCount - 1)
    //   ...e.t.c.
    // ]


    const [seriesCount, dataCount, levelsCount] = params
    const baseLevelsNames = ['Серии', 'Агрегация серий']
    const levelsNames = baseLevelsNames.slice(0, levelsCount - 1).reverse()
    const labels = []

    console.log(seriesCount, dataCount, levelsCount)

    let begin = new Date(2019, 0, 1).getTime()

    for (let i = dataCount; i > 0; i -= 1) {
      begin -= 1000 * 60 * 60
      const date = new Date(begin)
      labels.push(`${date.getFullYear()}-${date.getMonth()}-${date.getDate()}-${date.getHours()}`)
    }

    dataset.push([...levelsNames, ...labels])

    for (let level = levelsCount; level > 1; level -= 1) {}

    res.json({
      dataset
    })
  } catch (error) {
    res.json({
      error: new Error(error)
    })
  }
})

app.listen(3000)

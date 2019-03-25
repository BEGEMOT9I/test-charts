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

app.listen(3000)

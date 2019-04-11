import * as express from 'express'

function viewController(req: express.Request, res: express.Response) {
  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <title>Page Title</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <style type="text/css">
          body {
            margin: 0;
          }
        </style>
      </head>
      <style type="text/css">
        body {
          margin: 0;
        }
      </style>
      <body>
        <div id="root"></div>
        <script src="assets/client.js"></script>
      </body>
    </html>
  `)
}

export default viewController

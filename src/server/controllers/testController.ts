import * as express from 'express'
import * as fetch from 'node-fetch'

async function testController(req: express.Request, res: express.Response) {
  try {
    const pathToTest = (req.path.match(/^\/test\/(.+)$/) as Array<string>)[1]
    const response = await fetch(`${req.protocol}://${req.hostname}:3000/${pathToTest}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        seriesCount: 100,
        levelsDataCount: [100]
      })
    })
    // console.log((response.headers.get('content-length') / 1024).toFixed(3))
    const data = await response.json()

    res.json(data)
  } catch (error) {
    console.log(error)
    res.json({
      error
    })
  }
}

export default testController

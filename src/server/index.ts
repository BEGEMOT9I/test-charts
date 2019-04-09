import * as express from 'express'
import * as path from 'path'
import * as bodyParser from 'body-parser'

import { viewController, testController, nestedDataController, flatDatasetWithoutLabelsController, flatDatasetWithLabelsController } from './controllers'

const app = express()

app.use(bodyParser.json())
app.use('/assets', express.static(path.resolve(__dirname, '../../public/webpack')))

app.get('/', viewController)

app.get(/\/test\/.+/, testController)

// Incapsulated data in dataset
app.post('/nested-data', nestedDataController)

// Flat data without labels in dataset and with levels labels
app.post('/flat-data-without-labels', flatDatasetWithoutLabelsController)

// Flat data with labels in dataset
app.post('/flat-data-with-labels', flatDatasetWithLabelsController)

app.listen(3000)

import React, { PureComponent, ChangeEvent } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend } from 'recharts'

import Data, { Dataset } from 'src/data'

interface Props {
  width: number
  height: number
  datasets: Array<Dataset>
}
interface State {}

class Chart extends PureComponent<Props, State> {
  public render() {
    const { width, height, datasets } = this.props
    const formattedDatasets = Data.columns.map(column => {
      let result = { name: column }
      datasets.forEach(dataset => {
        const currentColumnPoint = dataset.data.find(point => point.name === column)
        result[dataset.name] = currentColumnPoint.value
      })
      return result
    })

    return (
      <BarChart
        width={width}
        height={height}
        data={formattedDatasets}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <XAxis dataKey="name" interval={0} />
        <YAxis />
        <CartesianGrid strokeDasharray="3 3" />
        {datasets.map((dataset, index) => (
          <Bar key={dataset.name} dataKey={dataset.name} fill={dataset.color} />
        ))}
        <Legend />
      </BarChart>
    )
  }
}

export default Chart

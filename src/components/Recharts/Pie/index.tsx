import React, { PureComponent, ChangeEvent } from 'react'
import { PieChart, Pie, Legend, LegendType } from 'recharts'

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
    let radius = 30
    let padding = 10

    return (
      <PieChart width={width} height={height}>
        {datasets.map((dataset, index) => (
          <Pie
            nameKey={dataset.nameKey}
            dataKey={dataset.dataKey}
            key={dataset.name}
            data={dataset.data}
            innerRadius={index * (padding + radius)}
            outerRadius={index * (padding + radius) + radius}
            fill={dataset.color}
          />
        ))}
        <Legend
          payload={datasets.map((dataset, index) => ({
            id: dataset.name,
            value: dataset.name,
            type: 'line' as LegendType
          }))}
        />
      </PieChart>
    )
  }
}

export default Chart

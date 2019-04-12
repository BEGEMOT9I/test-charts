import React, { PureComponent } from 'react'
import { VictoryChart, VictoryPie, VictoryLegend, VictoryTooltip, VictoryTheme } from 'victory'

import { FormattedDataset } from '../../../lib/services/data'
import { COLORS } from '../../../lib/constants/charts'

interface Props {
  width: number
  height: number
  dataset: FormattedDataset
  onStartedRendering: () => void
  onFinishedRendering: () => void
}
interface State {}

class PieChart extends PureComponent<Props, State> {
  public static displayName = 'PieChart'

  constructor(props: Props) {
    super(props)

    props.onStartedRendering()
  }

  componentDidMount() {
    this.props.onFinishedRendering()
  }

  public render() {
    const { width, height, dataset } = this.props
    const size = Math.min(width, height)
    const padding = 0
    const radius = (size / 2 - padding * (dataset.length - 2)) / (dataset.length - 1)
    const labels = dataset[0].slice(1, dataset[0].length) as Array<string>

    return (
      <VictoryChart theme={VictoryTheme.material} width={width} height={height}>
        <VictoryLegend
          x={0}
          y={0}
          orientation="horizontal"
          gutter={20}
          data={labels.map((label, index) => ({
            name: label,
            symbol: {
              fill: COLORS[index % COLORS.length]
            }
          }))}
        />
        {dataset.slice(1, dataset.length).map((seria, index) => {
          return (
            <VictoryPie
              key={seria[0]}
              colorScale={COLORS}
              data={seria.slice(1, seria.length).map((yValue, index) => ({ x: index, y: yValue }))}
              innerRadius={index * (padding + radius)}
              radius={index * (padding + radius) + radius}
              labels={data => `x: ${labels[data.x]}\ny: ${data.y}`}
              labelComponent={<VictoryTooltip />}
            />
          )
        })}
      </VictoryChart>
    )
  }
}

export default PieChart

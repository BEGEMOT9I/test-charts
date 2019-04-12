import React, { PureComponent } from 'react'
import {
  VictoryChart,
  VictoryVoronoiContainer,
  VictoryAxis,
  VictoryBar,
  VictoryGroup,
  VictoryLegend,
  VictoryTheme
} from 'victory'

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

class BarChart extends PureComponent<Props, State> {
  public static displayName = 'BarChart'

  constructor(props: Props) {
    super(props)

    props.onStartedRendering()
  }

  componentDidMount() {
    this.props.onFinishedRendering()
  }

  public render() {
    const { width, height, dataset } = this.props
    const labels = dataset[0].slice(1, dataset[0].length) as Array<string>

    return (
      <VictoryChart
        theme={VictoryTheme.material}
        width={width}
        height={height}
        containerComponent={<VictoryVoronoiContainer />}
      >
        <VictoryLegend
          x={0}
          y={0}
          orientation="horizontal"
          gutter={20}
          data={dataset.slice(1, dataset.length).map((seria, index) => ({
            name: seria[0] as string,
            symbol: {
              fill: COLORS[index % COLORS.length]
            }
          }))}
        />
        <VictoryAxis tickValues={labels.map((label, index) => index)} tickFormat={labels} />
        <VictoryAxis dependentAxis />
        <VictoryGroup offset={10}>
          {dataset.slice(1, dataset.length).map((seria, index) => (
            <VictoryBar
              key={seria[0]}
              style={{
                data: {
                  fill: COLORS[index % COLORS.length]
                }
              }}
              data={seria.slice(1, seria.length).map((yValue, index) => ({ x: index, y: yValue }))}
            />
          ))}
        </VictoryGroup>
      </VictoryChart>
    )
  }
}

export default BarChart

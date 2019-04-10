import React, { PureComponent } from 'react'
import ReactEchartsCore from 'echarts-for-react/lib/core'
import echarts from 'echarts/lib/echarts'
import 'echarts/lib/chart/bar'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/legendScroll'
import 'echarts/lib/component/grid'

import { FormattedDataset } from '../../../lib/services/data'

interface Props {
  width: number
  height: number
  dataset: FormattedDataset
  onStartedRendering: () => void
  onFinishedRendering: () => void
}
interface State { }

class BarChart extends PureComponent<Props, State> {
  public static displayName = 'BarChart'

  constructor(props: Props) {
    super(props)

    props.onStartedRendering()
  }

  public render() {
    const { width, height, dataset, onFinishedRendering } = this.props

    return (
      <ReactEchartsCore
        echarts={echarts}
        style={{ width, height }}
        option={{
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            type: 'scroll'
          },
          grid: {
            top: 60,
            left: 40,
            right: 60,
            bottom: 30
          },
          xAxis: [
            { type: 'category' },
          ],
          yAxis: {},
          dataset: {
            source: dataset
          },
          series: dataset.slice(1, dataset.length).map(() => ({ type: 'bar', seriesLayoutBy: 'row' })),
          animation: false
        }}
        onEvents={{
          finished: onFinishedRendering
        }}
      />
    )
  }
}

export default BarChart

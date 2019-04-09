import React, { PureComponent, ChangeEvent } from 'react'
import ReactEchartsCore from 'echarts-for-react/lib/core'
import echarts from 'echarts/lib/echarts'
import 'echarts/lib/chart/line'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/legendScroll'
import 'echarts/lib/component/grid'

import { FormattedDataset } from '../../../lib/services/data'

interface Props {
  width: number
  height: number
  dataset: FormattedDataset
}
interface State { }

class LineChart extends PureComponent<Props, State> {
  public render() {
    const { width, height, dataset } = this.props

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
          series: dataset.slice(1, dataset.length).map(() => ({ type: 'line', seriesLayoutBy: 'row' }))
        }}
      />
    )
  }
}

export default LineChart
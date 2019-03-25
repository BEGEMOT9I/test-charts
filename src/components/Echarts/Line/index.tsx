import React, { PureComponent, ChangeEvent } from 'react'
import ReactEchartsCore from 'echarts-for-react/lib/core'
import echarts from 'echarts/lib/echarts'
import 'echarts/lib/chart/line'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/legendScroll'
import 'echarts/lib/component/grid'
import 'echarts/lib/component/toolbox'

import Data, { Dataset } from '../../../data'

interface Props {
  width: number
  height: number
  datasets: Array<Dataset>
}
interface State {}

class Chart extends PureComponent<Props, State> {
  public render() {
    const { width, height, datasets } = this.props

    return (
      <ReactEchartsCore
        echarts={echarts}
        style={{ width, height }}
        option={{
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            type: 'scroll',
            data: datasets.map(dataset => dataset.name)
          },
          toolbox: {
            show: true,
            feature: {
              dataView: { readOnly: false },
              restore: {},
              saveAsImage: {}
            }
          },
          color: datasets.map(dataset => dataset.color),
          grid: {
            top: 60,
            left: 40,
            right: 60,
            bottom: 30
          },
          xAxis: [
            {
              type: 'category',
              name: 'Месяц',
              boundaryGap: true,
              data: Data.columns
            }
          ],
          yAxis: [
            {
              type: 'value',
              scale: true,
              name: 'Данные',
              max: 1000,
              min: 0,
              boundaryGap: [0.2, 0.2]
            }
          ],
          series: datasets.map(dataset => ({
            name: dataset.name,
            type: 'line',
            animationEasing: 'elasticOut',
            animationDelay: function(idx: number) {
              return idx * 10
            },
            animationDelayUpdate: function(idx: number) {
              return idx * 10
            },
            data: dataset.data
          }))
        }}
      />
    )
  }
}

export default Chart

import React, { PureComponent, ChangeEvent } from 'react'
import ReactEchartsCore from 'echarts-for-react/lib/core'
import echarts from 'echarts/lib/echarts'
import 'echarts/lib/chart/pie'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/legendScroll'
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
    const size = Math.min(width, height)
    const padding = Math.max(size / datasets.length * 0.1, 1)
    const radius = (size / 2 - padding * (datasets.length - 1)) / datasets.length

    return (
      <ReactEchartsCore
        echarts={echarts}
        style={{ width, height }}
        option={{
          tooltip: {
            trigger: 'item'
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
          series: datasets.map((dataset, index) => ({
            name: dataset.name,
            type: 'pie',
            itemStyle: {
              color: dataset.color
            },
            label: {
              show: false
            },
            radius: [index * (padding + radius), index * (padding + radius) + radius],
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

import React, { PureComponent } from 'react'
import ReactEchartsCore from 'echarts-for-react/lib/core'
import echarts from 'echarts/lib/echarts'
import 'echarts/lib/chart/pie'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/legendScroll'

import { FormattedDataset } from '../../../lib/services/data'

interface Props {
  width: number
  height: number
  dataset: FormattedDataset
  onStartedRendering: () => void
  onFinishedRendering: () => void
}
interface State { }

class PieChart extends PureComponent<Props, State> {
  public static displayName = 'PieChart'

  constructor(props: Props) {
    super(props)

    props.onStartedRendering()
  }

  public render() {
    const { width, height, dataset, onFinishedRendering } = this.props
    const size = Math.min(width, height)
    const padding = Math.max(size / (dataset.length - 1) * 0.1, 1)
    const radius = (size / 2 - padding * (dataset.length - 2)) / (dataset.length - 1)

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
            data: dataset.length ? dataset[0].map(label => ({
              name: label,
              icon: 'circle'
            })) : []
          },
          series: dataset.slice(1, dataset.length).map((seria, index) => ({
            name: seria[0],
            type: 'pie',
            label: {
              show: false
            },
            radius: [index * (padding + radius), index * (padding + radius) + radius],
            data: seria.slice(1, seria.length).map((value, valueIndex, array) => ({
              value,
              name: dataset[0][dataset[0].length - array.length + valueIndex]
            }))
          })),
          animation: false
        }}
        onEvents={{
          finished: onFinishedRendering
        }}
      />
    )
  }
}

export default PieChart

import React, { PureComponent, createRef } from 'react'
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
  private canvas = createRef<HTMLCanvasElement>()

  constructor(props: Props) {
    super(props)

    props.onStartedRendering()
  }

  componentDidMount() {
    const { width, height, dataset, onFinishedRendering } = this.props
    const chart = echarts.init(this.canvas.current)
    const size = Math.min(width, height)
    const padding = Math.max(size / (dataset.length - 1) * 0.1, 1)
    const radius = (size / 2 - padding * (dataset.length - 2)) / (dataset.length - 1)

    chart.on('finished', onFinishedRendering)
    chart.setOption({
      tooltip: {
        trigger: 'item'
      },
      legend: {
        type: 'scroll',
        data: dataset.length ? dataset[0].slice(1, dataset[0].length).map(label => ({
          name: label,
          icon: 'circle'
        })) : []
      },
      dataset: {
        source: dataset
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
    })
  }

  public render() {
    const { width, height } = this.props

    return (
      <canvas ref={this.canvas} width={width} height={height} style={{ width: `${width}px`, height: `${height}px` }}/>
    )
  }
}

export default PieChart
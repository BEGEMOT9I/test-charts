import React, { PureComponent, createRef } from 'react'
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
  onStartedRendering: () => void
  onFinishedRendering: () => void
}
interface State { }

class LineChart extends PureComponent<Props, State> {
  public static displayName = 'LineChart'
  private canvas = createRef<HTMLCanvasElement>()

  constructor(props: Props) {
    super(props)

    props.onStartedRendering()
  }

  componentDidMount() {
    const { dataset, onFinishedRendering } = this.props
    const chart = echarts.init(this.canvas.current)

    chart.on('finished', onFinishedRendering)
    chart.setOption({
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
      series: dataset.slice(1, dataset.length).map(() => ({ type: 'line', seriesLayoutBy: 'row' })),
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

export default LineChart
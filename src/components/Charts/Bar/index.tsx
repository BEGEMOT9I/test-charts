import React, { PureComponent, createRef } from 'react'
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
interface State {}

class BarChart extends PureComponent<Props, State> {
  public static displayName = 'BarChart'
  private element = createRef<HTMLDivElement>()

  constructor(props: Props) {
    super(props)

    props.onStartedRendering()
  }

  componentDidMount() {
    const { dataset, onFinishedRendering } = this.props
    const chart = echarts.init(this.element.current)

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
      xAxis: [{ type: 'category' }],
      yAxis: {},
      dataset: {
        source: dataset
      },
      series: dataset.slice(1, dataset.length).map(() => ({ type: 'bar', seriesLayoutBy: 'row' })),
      animation: false
    })
  }

  public render() {
    const { width, height } = this.props

    return <div ref={this.element} style={{ width, height }} />
  }
}

export default BarChart

import React, { PureComponent, createRef } from 'react'
import Highcharts from 'highcharts'
import Data from 'highcharts/modules/data'

import { FormattedDataset } from '../../../lib/services/data'

interface Props {
  width: number
  height: number
  dataset: FormattedDataset
  onStartedRendering: () => void
  onFinishedRendering: () => void
}
interface State {}

Data(Highcharts)

class LineChart extends PureComponent<Props, State> {
  public static displayName = 'LineChart'
  private element = createRef<HTMLDivElement>()

  constructor(props: Props) {
    super(props)

    props.onStartedRendering()
  }

  componentDidMount() {
    const { dataset, onFinishedRendering } = this.props

    Highcharts.chart(this.element.current, {
      chart: {
        type: 'line',
        animation: false,
        events: {
          render: onFinishedRendering
        }
      },
      legend: {
        layout: 'horizontal',
        maxHeight: 40
      },
      xAxis: {
        type: 'category'
      },
      plotOptions: {
        series: {
          animation: {
            duration: 0
          }
        }
      },
      data: {
        columns: dataset
      }
    })
  }

  public render() {
    const { width, height } = this.props

    return <div ref={this.element} style={{ width, height }} />
  }
}

export default LineChart

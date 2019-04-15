import React, { PureComponent, createRef } from 'react'
import Highcharts from 'highcharts'

import { FormattedDataset } from '../../../lib/services/data'

interface Props {
  width: number
  height: number
  dataset: FormattedDataset
  onStartedRendering: () => void
  onFinishedRendering: () => void
}
interface State {}

class PieChart extends PureComponent<Props, State> {
  public static displayName = 'PieChart'
  private element = createRef<HTMLDivElement>()

  constructor(props: Props) {
    super(props)

    props.onStartedRendering()
  }

  componentDidMount() {
    const { dataset, onFinishedRendering } = this.props
    const size = 1
    const padding = 0
    const radius = (size - padding * (dataset.length - 2)) / (dataset.length - 1)
    const labels = dataset[0].slice(1, dataset[0].length) as Array<string>

    Highcharts.chart(this.element.current, {
      chart: {
        type: 'pie',
        animation: false,
        events: {
          render: onFinishedRendering
        }
      },
      legend: {
        layout: 'horizontal',
        maxHeight: 40
      },
      series: dataset.slice(1, dataset.length).map((seria, index) => ({
        type: 'pie',
        data: (seria.slice(1, seria.length) as Array<number>).map((value, index) => ({
          y: value,
          name: labels[index]
        })),
        innerSize: `${index * (padding + radius) * 100}%`,
        size: `${(index * (padding + radius) + radius) * 100}%`,
        name: seria[0] as string
      })),
      plotOptions: {
        pie: {
          dataLabels: {
            enabled: false
          }
        },
        series: {
          showInLegend: true,
          animation: {
            duration: 0
          }
        }
      }
    })
  }

  public render() {
    const { width, height } = this.props

    return <div ref={this.element} style={{ width, height }} />
  }
}

export default PieChart

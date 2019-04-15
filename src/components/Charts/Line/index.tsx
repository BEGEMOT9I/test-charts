import React, { PureComponent } from 'react'
import Highcharts from 'highcharts'
import Data from 'highcharts/modules/data'
import HighchartsReact from 'highcharts-react-official'

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

  constructor(props: Props) {
    super(props)

    props.onStartedRendering()
  }

  public render() {
    const { width, height, dataset, onFinishedRendering } = this.props

    const options = {
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
    }

    return <HighchartsReact highcharts={Highcharts} options={options} style={{ width, height }} />
  }
}

export default LineChart

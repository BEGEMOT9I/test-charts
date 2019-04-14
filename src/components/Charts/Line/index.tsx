import React, { PureComponent, createRef } from 'react'
import * as am4core from '@amcharts/amcharts4/core'
import * as am4charts from '@amcharts/amcharts4/charts'

import { FormattedDataset } from '../../../lib/services/data'

interface Props {
  width: number
  height: number
  dataset: FormattedDataset
  onStartedRendering: () => void
  onFinishedRendering: () => void
}
interface State {}

class LineChart extends PureComponent<Props, State> {
  public static displayName = 'LineChart'
  private element = createRef<HTMLDivElement>()

  constructor(props: Props) {
    super(props)

    props.onStartedRendering()
  }

  componentDidMount() {
    const { dataset, onFinishedRendering } = this.props
    const labels = dataset[0].slice(1, dataset[0].length)
    const formattedDataset = labels.map((label, index) => ({
      date: label
    }))

    dataset.slice(1, dataset.length).map((seria, seriaIndex) => {
      seria.slice(1, seria.length).forEach((value, valueIndex) => {
        formattedDataset[valueIndex][seria[0]] = value
      })
    })

    const chart = am4core.create(this.element.current, am4charts.XYChart)
    chart.events.on('ready', onFinishedRendering)
    chart.legend = new am4charts.Legend()

    const categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis())
    categoryAxis.dataFields.category = 'date'

    chart.yAxes.push(new am4charts.ValueAxis())

    dataset.slice(1, dataset.length).forEach(seria => {
      const series = chart.series.push(new am4charts.LineSeries())
      series.name = seria[0] as string
      series.dataFields.valueY = seria[0] as string
      series.dataFields.categoryX = 'date'
      series.tooltipText = 'Series: {name}\nCategory: {categoryX}\nValue: {valueY}'
    })
    chart.cursor = new am4charts.XYCursor()
    chart.data = formattedDataset
  }

  public render() {
    const { width, height } = this.props

    return <div style={{ width, height }} ref={this.element} />
  }
}

export default LineChart

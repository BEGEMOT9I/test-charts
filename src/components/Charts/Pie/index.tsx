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

class PieChart extends PureComponent<Props, State> {
  public static displayName = 'PieChart'
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

    const chart = am4core.create(this.element.current, am4charts.PieChart)
    chart.events.on('ready', onFinishedRendering)
    chart.legend = new am4charts.Legend()

    dataset.slice(1, dataset.length).forEach(seria => {
      const series = chart.series.push(new am4charts.PieSeries())
      series.name = seria[0] as string
      series.dataFields.value = seria[0] as string
      series.dataFields.category = 'date'
      series.labels.template.disabled = true
      series.ticks.template.disabled = true
      series.tooltipText = 'Series: {name}\nCategory: {categoryX}\nValue: {valueY}'
    })
    chart.data = formattedDataset
  }

  public render() {
    const { width, height } = this.props

    return <div style={{ width, height }} ref={this.element} />
  }
}

export default PieChart

/// <reference types="anychart" />

import React, { PureComponent, createRef } from 'react'
import 'anychart/dist/js/anychart-base.min'

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
    const formattedDataset = labels.map(label => [label])
    const stage = anychart.graphics.create(this.element.current)
    const chart = anychart.pie()

    dataset
      .slice(1, 2)
      .map((seria, seriaIndex) =>
        seria.slice(1, seria.length).forEach((value, index) => formattedDataset[index].push(value))
      )

    const chartDataSet = anychart.data.set(formattedDataset)

    // @ts-ignore
    stage.listenOnce('renderfinish', () => {
      onFinishedRendering()
    })
    chart.data(chartDataSet)
    chart.legend(true)
    chart.container(stage)
    chart.draw()
  }

  public render() {
    const { width, height } = this.props

    return <div id="container" style={{ width, height }} ref={this.element} />
  }
}

export default PieChart

/// <reference types="anychart" />

import React, { PureComponent, createRef } from 'react'
import 'anychart/dist/js/anychart-base.min'
import 'anychart/dist/js/anychart-exports.min'
import 'anychart/dist/js/anychart-ui.min'

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
    const chart = anychart.line()

    chart.line(dataset.slice(1, dataset.length))
    chart.container()
  }

  public render() {
    const { width, height } = this.props

    return <div id="container" style={{ width, height }} ref={this.element} />
  }
}

export default LineChart

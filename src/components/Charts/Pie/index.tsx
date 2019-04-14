import React, { PureComponent, createRef } from 'react'
import Plotly from 'plotly.js/lib/core'
import PlotlyLine from 'plotly.js/lib/pie'

import { FormattedDataset } from '../../../lib/services/data'

Plotly.register([PlotlyLine])

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

  async componentDidMount() {
    const { dataset } = this.props
    const labels = dataset[0].slice(1, dataset[0].length)
    const size = 1
    const padding = 0
    const radius = (size - padding * (dataset.length - 2)) / (dataset.length - 1)

    try {
      await Plotly.newPlot(
        this.element.current,
        dataset.slice(1, dataset.length).map((seria, index) => ({
          type: 'pie',
          labels,
          values: seria.slice(1, seria.length),
          name: seria[0],
          hole: index * (padding + radius),
          textinfo: 'none'
        })),
        {},
        { displayModeBar: false }
      )
    } finally {
      this.props.onFinishedRendering()
    }
  }

  public render() {
    const { width, height } = this.props

    return <div ref={this.element} style={{ width, height }} />
  }
}

export default PieChart

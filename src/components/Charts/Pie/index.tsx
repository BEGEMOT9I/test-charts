import React, { PureComponent } from 'react'
import Plotly from 'plotly.js/lib/core'
import PlotlyLine from 'plotly.js/lib/pie'
import createPlotlyComponent from 'react-plotly.js/factory'

import { FormattedDataset } from '../../../lib/services/data'

Plotly.register([PlotlyLine])

const Plot = createPlotlyComponent(Plotly)

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

  constructor(props: Props) {
    super(props)

    props.onStartedRendering()
  }

  public render() {
    const { width, height, dataset, onFinishedRendering } = this.props
    const labels = dataset[0].slice(1, dataset[0].length)
    const size = 1
    const padding = 0
    const radius = (size - padding * (dataset.length - 2)) / (dataset.length - 1)

    return (
      <Plot
        layout={{
          width,
          height,
          showlegend: true
        }}
        data={dataset.slice(1, dataset.length).map((seria, index) => ({
          type: 'pie',
          labels,
          values: seria.slice(1, seria.length),
          name: seria[0],
          hole: index * (padding + radius),
          textinfo: 'none'
        }))}
        config={{ displayModeBar: false }}
        onInitialized={onFinishedRendering}
      />
    )
  }
}

export default PieChart

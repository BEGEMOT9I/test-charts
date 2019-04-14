import React, { PureComponent } from 'react'
import Plotly from 'plotly.js/lib/core'
import PlotlyLine from 'plotly.js/lib/scatter'
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

class LineChart extends PureComponent<Props, State> {
  public static displayName = 'LineChart'

  constructor(props: Props) {
    super(props)

    props.onStartedRendering()
  }

  public render() {
    const { width, height, dataset, onFinishedRendering } = this.props
    const labels = dataset[0].slice(1, dataset[0].length)

    return (
      <Plot
        layout={{
          width,
          height,
          showlegend: true
        }}
        data={dataset.slice(1, dataset.length).map(seria => ({
          type: 'scatter',
          x: labels,
          y: seria.slice(1, seria.length),
          name: seria[0]
        }))}
        config={{ displayModeBar: false }}
        onInitialized={onFinishedRendering}
      />
    )
  }
}

export default LineChart

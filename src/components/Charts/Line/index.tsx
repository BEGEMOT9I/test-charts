/// <reference types="anychart" />

import React, { PureComponent } from 'react'
import AnyChart from 'anychart-react'

import { FormattedDataset } from '../../../lib/services/data'

interface Props {
  width: number
  height: number
  dataset: FormattedDataset
  onStartedRendering: () => void
  onFinishedRendering: () => void
}
interface State {
  isMounted: boolean
}

class LineChart extends PureComponent<Props, State> {
  public static displayName = 'LineChart'
  public state: State = {
    isMounted: false
  }

  constructor(props: Props) {
    super(props)

    props.onStartedRendering()
  }

  componentDidMount() {
    this.setState({ isMounted: true })
  }

  componentDidUpdate() {
    this.props.onFinishedRendering()
  }

  public render() {
    const { width, height, dataset } = this.props

    if (this.state.isMounted) {
      const labels = dataset[0].slice(1, dataset[0].length)
      const formattedDataset = labels.map(label => [label])

      dataset
        .slice(1, dataset.length)
        .map((seria, seriaIndex) =>
          seria
            .slice(1, seria.length)
            .forEach((value, index) => formattedDataset[index].push(value))
        )

      const chartDataSet = anychart.data.set(formattedDataset)

      return <AnyChart data={chartDataSet} />
    }

    return <AnyChart width={width} height={height} type="line" legend />
  }
}

export default LineChart

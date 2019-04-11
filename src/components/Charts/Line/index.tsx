import React, { PureComponent } from 'react'

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

  constructor(props: Props) {
    super(props)

    props.onStartedRendering()
  }

  componentDidMount() {
    this.props.onFinishedRendering()
  }

  public render() {
    const { width, height } = this.props

    return null
  }
}

export default LineChart

import React, { PureComponent, createRef } from 'react'
import c3 from 'c3'
import 'c3/c3.css'

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

    c3.generate({
      bindto: this.element.current,
      data: {
        x: 'x',
        columns: [['x', ...labels]].concat(dataset.slice(1, dataset.length)) as Array<
          Array<string | number>
        >
      },
      axis: {
        x: {
          type: 'category'
        }
      },
      transition: {
        duration: 0
      },
      onrendered: onFinishedRendering
    })
  }

  public render() {
    const { width, height } = this.props

    return <div ref={this.element} style={{ width, height }} />
  }
}

export default LineChart

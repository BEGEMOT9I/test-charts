import React, { PureComponent, createRef } from 'react'
import Chart from 'chart.js'

import { FormattedDataset } from '../../../lib/services/data'

interface Props {
  width: number
  height: number
  dataset: FormattedDataset
  onStartedRendering: () => void
  onFinishedRendering: () => void
}
interface State { }

class LineChart extends PureComponent<Props, State> {
  public static displayName = 'LineChart'
  private canvas = createRef<HTMLCanvasElement>()

  constructor(props: Props) {
    super(props)

    props.onStartedRendering()
  }

  componentDidMount() {
    const { dataset, onFinishedRendering } = this.props
    const chart = new Chart(this.canvas.current, {
      type: 'line',
      data: {
        labels: dataset.length ? dataset[0].slice(1, dataset[0].length) as Array<string> : [],
        datasets: dataset.slice(1, dataset.length).map((seria) => {
          const color = `#${Math.random()
            .toString(16)
            .substr(-6)}`
          return {
            label: seria[0] as string,
            data: seria.slice(1, seria.length) as Array<number>,
            backgroundColor: color,
            borderColor: color,
            fill: false
          }
        })
      },
      options: {
        animation: {
          duration: 0, // general animation time
          onComplete: onFinishedRendering
        },
      }
    })
  }

  public render() {
    const { width, height } = this.props

    return (
      <canvas ref={this.canvas} width={width} height={height} />
    )
  }
}

export default LineChart
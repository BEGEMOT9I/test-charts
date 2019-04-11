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

class PieChart extends PureComponent<Props, State> {
  public static displayName = 'PieChart'
  private canvas = createRef<HTMLCanvasElement>()

  constructor(props: Props) {
    super(props)

    props.onStartedRendering()
  }

  componentDidMount() {
    const { dataset, onFinishedRendering } = this.props
    const labels = dataset.length ? dataset[0].slice(1, dataset[0].length) as Array<string> : []
    const colors = labels.map(() => `#${Math.random().toString(16).substr(-6)}`)
    const chart = new Chart(this.canvas.current, {
      type: 'pie',
      data: {
        labels,
        datasets: dataset.slice(1, dataset.length).map((seria) => {
          return {
            label: seria[0] as string,
            data: seria.slice(1, seria.length) as Array<number>,
            backgroundColor: colors,
            borderColor: colors,
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

export default PieChart
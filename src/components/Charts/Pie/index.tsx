import React, { PureComponent, createRef, Fragment } from 'react'
import {
  XYPlot,
  HorizontalGridLines,
  VerticalGridLines,
  XAxis,
  YAxis,
  ArcSeries,
  DiscreteColorLegend,
  Crosshair
} from 'react-vis'
import { DISCRETE_COLOR_RANGE as COLORS } from 'react-vis/dist/theme'
import 'react-vis/dist/style.css'

import { FormattedDataset } from '../../../lib/services/data'

interface Props {
  width: number
  height: number
  dataset: FormattedDataset
  onStartedRendering: () => void
  onFinishedRendering: () => void
}
interface State {
  nearestXValues: Array<{
    x: string
    y: number
  }>
  arcDataset: Array<
    Array<
      | string
      | {
          angle0: number
          angle: number
          radius0: number
          radius: number
          color: string
        }
    >
  >
}

class PieChart extends PureComponent<Props, State> {
  public static displayName = 'PieChart'

  constructor(props: Props) {
    super(props)

    this.state = {
      arcDataset: this.formatArcDataset(props.dataset),
      nearestXValues: []
    }
    props.onStartedRendering()
  }

  componentDidMount() {
    this.props.onFinishedRendering()
  }

  private formatArcDataset = (dataset: FormattedDataset) => {
    const arcDataset: State['arcDataset'] = [dataset[0] as Array<string>]
    const size = 1
    const radiusGlobal = size / 2 / (dataset.length - 1)

    dataset.slice(1, dataset.length).forEach((seria, seriaIndex) => {
      const arcSeria: Array<
        | string
        | {
            angle0: number
            angle: number
            radius0: number
            radius: number
            color: string
          }
      > = [seria[0] as string]
      const sum = (seria.slice(1, seria.length) as Array<number>).reduce(
        (result, value) => (result += value),
        0
      )
      const radius0 = seriaIndex * radiusGlobal
      const radius = seriaIndex * radiusGlobal + radiusGlobal

      seria.slice(1, seria.length).forEach((value: number, valueIndex) => {
        const angle0 =
          typeof arcSeria[valueIndex] === 'object'
            ? (arcSeria[valueIndex] as {
                angle0: number
                angle: number
                radius0: number
                radius: number
                color: string
              }).angle
            : 0
        const angle = angle0 + (sum ? value / sum * Math.PI * 2 : Math.PI * 2)

        arcSeria.push({
          radius0,
          radius,
          angle0,
          angle,
          color: COLORS[valueIndex % COLORS.length]
        })
      })

      arcDataset.push(arcSeria)
    })

    return arcDataset
  }

  private onNearestX = (value: Object, { index }: { index: number }) => {
    const { dataset } = this.props

    this.setState({
      nearestXValues: dataset.slice(1, dataset.length).map(seria => ({
        x: dataset[0][index + 1] as string,
        y: seria[index + 1] as number
      }))
    })
  }

  private onMouseLeave = () => this.setState({ nearestXValues: [] })

  public render() {
    const { width, height } = this.props
    const { arcDataset } = this.state
    const labels = arcDataset[0].slice(1, arcDataset[0].length)

    return (
      <Fragment>
        <XYPlot
          width={width}
          height={height}
          xDomain={[-1, 1]}
          yDomain={[-1, 1]}
          onMouseLeave={this.onMouseLeave}
        >
          <HorizontalGridLines style={{ stroke: '#B7E9ED' }} />
          <VerticalGridLines style={{ stroke: '#B7E9ED' }} />
          <XAxis />
          <YAxis />
          {arcDataset.slice(1, arcDataset.length).map(seria => {
            return (
              <ArcSeries
                key={seria[0]}
                data={seria.slice(1, seria.length)}
                colorType={'literal'}
                onNearestX={this.onNearestX}
              />
            )
          })}
          <Crosshair values={this.state.nearestXValues} />
        </XYPlot>
        <DiscreteColorLegend width={width} items={labels} orientation="horizontal" />
      </Fragment>
    )
  }
}

export default PieChart

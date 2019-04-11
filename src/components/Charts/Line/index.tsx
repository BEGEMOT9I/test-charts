import React, { PureComponent, createRef, Fragment } from 'react'
import {
  XYPlot,
  HorizontalGridLines,
  VerticalGridLines,
  XAxis,
  YAxis,
  LineSeries,
  DiscreteColorLegend,
  Crosshair
} from 'react-vis'
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
}

class LineChart extends PureComponent<Props, State> {
  public static displayName = 'LineChart'
  public state: State = {
    nearestXValues: []
  }

  constructor(props: Props) {
    super(props)

    props.onStartedRendering()
  }

  componentDidMount() {
    this.props.onFinishedRendering()
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
    const { width, height, dataset } = this.props
    const labels = dataset[0].slice(1, dataset[0].length)

    return (
      <Fragment>
        <XYPlot onMouseLeave={this.onMouseLeave} xType="ordinal" width={width} height={height}>
          <HorizontalGridLines style={{ stroke: '#B7E9ED' }} />
          <VerticalGridLines style={{ stroke: '#B7E9ED' }} />
          <XAxis />
          <YAxis />
          {dataset.slice(1, dataset.length).map(seria => {
            return (
              <LineSeries
                key={seria[0]}
                onNearestX={this.onNearestX}
                data={seria
                  .slice(1, seria.length)
                  .map((yValue, index) => ({ x: labels[index], y: yValue }))}
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

export default LineChart

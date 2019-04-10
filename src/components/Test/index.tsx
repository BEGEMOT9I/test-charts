import React, { PureComponent, ComponentType, ReactElement } from 'react'

import DataService, { FormattedDataset } from '../../lib/services/data'
import { STAGES } from '../../lib/constants/testing'

interface Props {
  width: number
  height: number
}
interface State {
  timerName?: string
  element?: JSX.Element
  subStageIndex: number
  stageIndex: number
}

class Test extends PureComponent<Props, State> {
  state: State = {
    subStageIndex: 0,
    stageIndex: 0
  }

  componentDidMount() {
    this.start()
  }

  private start() {
    this.startStage()
  }



  private async startStage() {
    const { width, height } = this.props
    const { subStageIndex, stageIndex } = this.state
    const { element: ChartElement, substages } = STAGES[stageIndex]
    const stageOptions = substages[subStageIndex]
    const dataset = await DataService.getDataset(stageOptions)

    this.setState({
      timerName: `On rendered component "${ChartElement.displayName}" with dataset options:\n  - seriesCount = ${stageOptions.seriesCount}\n  - levelsDataCount = ${stageOptions.levelsDataCount}`,
      element: <ChartElement key={`stage-${stageIndex}-substage-${subStageIndex}`} width={width} height={height} dataset={dataset} onStartedRendering={this.onStartedRendering} onFinishedRendering={this.onFinishedRendering}/>
    })
  }

  public onStartedRendering = () => {
    console.time(this.state.timerName)
  }

  public onFinishedRendering = () => {
    console.timeEnd(this.state.timerName)

    const { subStageIndex, stageIndex } = this.state
    const { substages } = STAGES[stageIndex]

    let nextSubStageIndex = subStageIndex
    let nextStageIndex = stageIndex

    if (subStageIndex === substages.length - 1) {
      if (nextStageIndex < STAGES.length - 1) {
        nextStageIndex += 1
        nextSubStageIndex = 0
      }
    } else {
      nextSubStageIndex += 1
    }

    if (nextSubStageIndex !== subStageIndex || nextStageIndex !== stageIndex) {
      this.setState({
        subStageIndex: nextSubStageIndex,
        stageIndex: nextStageIndex
      }, () => this.startStage())
    }
  }

  render() {
    const { element } = this.state

    return element || null
  }
}

export default Test
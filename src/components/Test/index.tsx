import React, { PureComponent, ComponentType, ReactElement } from 'react'

import DataService, { FormattedDataset } from '../../lib/services/data'
import { STAGES } from '../../lib/constants/testing'

interface Props {
  width: number
  height: number
}
interface State {
  result: Array<{
    componentName: string
    stageOptions: {
      seriesCount: number
      levelsDataCount: Array<number>
    }
    time: number
  }>
  timerName?: string
  element?: JSX.Element
  subStageIndex: number
  stageIndex: number
}

class Test extends PureComponent<Props, State> {
  private startTime: Date
  state: State = {
    result: [],
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
      timerName: `On rendered component "${
        ChartElement.displayName
      }" with dataset options:\n  - seriesCount = ${
        stageOptions.seriesCount
      }\n  - levelsDataCount = ${stageOptions.levelsDataCount}`,
      element: (
        <ChartElement
          key={`stage-${stageIndex}-substage-${subStageIndex}`}
          width={width}
          height={height}
          dataset={dataset}
          onStartedRendering={this.onStartedRendering}
          onFinishedRendering={this.onFinishedRendering}
        />
      )
    })
  }

  public onStartedRendering = () => {
    this.startTime = new Date()
    // console.time(this.state.timerName)
  }

  public onFinishedRendering = () => {
    // console.timeEnd(this.state.timerName)
    const time = new Date().getTime() - this.startTime.getTime()

    const { subStageIndex, stageIndex, result } = this.state
    const { substages } = STAGES[stageIndex]
    const nextResult: State['result'] = result.concat({
      componentName: STAGES[stageIndex].element.displayName,
      stageOptions: substages[subStageIndex],
      time
    })

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
      this.setState(
        {
          result: nextResult,
          subStageIndex: nextSubStageIndex,
          stageIndex: nextStageIndex
        },
        () => this.startStage()
      )
    } else {
      this.setState(
        {
          result: nextResult
        },
        this.showResult
      )
    }
  }

  private showResult() {
    const { result } = this.state
    const componentsNames = STAGES.reduce((result, stage) => {
      if (!result.includes(stage.element.displayName)) {
        result.push(stage.element.displayName)
      }

      return result
    }, [])

    const header = ['Options', ...componentsNames]
    const splitter = header
      .map(name => '-')
      .join(' | ')
      .concat('\n')
    const table: Array<Array<string | undefined>> = []

    result.slice(1, result.length).forEach((resultInfo, index) => {
      const elementIndex = header.indexOf(resultInfo.componentName)
      const optionsCell = `Series: ${resultInfo.stageOptions.seriesCount}; Levels: [${
        resultInfo.stageOptions.levelsDataCount
      }]`
      const existedRow = table.find(row => row[0] === optionsCell)

      if (existedRow) {
        existedRow[elementIndex] = `${resultInfo.time}ms`
      } else {
        const row = header.map(item => undefined)

        row[0] = optionsCell
        row[elementIndex] = `${resultInfo.time}ms`
        table.push(row)
      }
    })

    console.log(
      header
        .join(' | ')
        .concat(`\n| ${splitter} |`)
        .concat(table.map(row => row.map(item => item || '-').join(' | ')).join('\n'))
    )
  }

  render() {
    const { element } = this.state

    return element || null
  }
}

export default Test

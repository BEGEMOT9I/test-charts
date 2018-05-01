import React, { PureComponent, ChangeEvent, MouseEvent } from 'react'
import { saveSvgAsPng } from 'save-svg-as-png'

import Data, { Dataset } from '../../data'
import Pie from 'components/Pie'
import Line from 'components/Line'
import Bar from 'components/Bar'
import Table from 'components/Table'

interface Props {}
interface State {
  chartType: string
  width: number
  height: number
  split: boolean
  datasets: Array<Dataset>
}

class App extends PureComponent<Props, State> {
  private charts = [
    {
      name: 'pie',
      component: Pie
    },
    {
      name: 'line',
      component: Line
    },
    {
      name: 'bar',
      component: Bar
    },
    {
      name: 'table',
      component: Table
    }
  ]

  public constructor(props: Props) {
    super(props)
    this.state = {
      chartType: this.charts[0].name,
      width: document.body.offsetWidth,
      height: 400,
      split: false,
      datasets: [Data.generateDataset()]
    }

    this.addDataset = this.addDataset.bind(this)
    this.selectChart = this.selectChart.bind(this)
    this.toggleSplit = this.toggleSplit.bind(this)
  }

  public componentDidMount() {
    window.addEventListener('resize', this.resize)
  }

  private addDataset() {
    this.setState({ datasets: [...this.state.datasets, Data.generateDataset()] })
  }

  private selectChart(event: ChangeEvent<HTMLSelectElement>) {
    this.setState({ chartType: event.target.value })
  }

  private toggleSplit(event: ChangeEvent<HTMLInputElement>) {
    this.setState({ split: !this.state.split })
  }

  private getSnapshot(event: MouseEvent<HTMLButtonElement>) {
    const svg = event.currentTarget.nextSibling.childNodes[0]
    saveSvgAsPng(svg, 'diagram.png')
  }

  private resize = () => {
    this.setState({ width: document.body.offsetWidth })
  }

  public render() {
    const { width, height, datasets, chartType, split } = this.state
    const ChartComponent = this.charts.find(chart => chart.name === chartType).component

    return (
      <div>
        <div style={{ display: 'flex' }}>
          <button onClick={this.addDataset}>Добавить датасет</button>
          <select name="chartType" id="chartType" onChange={this.selectChart}>
            {this.charts.map(chart => (
              <option key={chart.name} value={chart.name}>
                {chart.name}
              </option>
            ))}
          </select>
          <label htmlFor="split">Разбить данные</label>
          <input
            type="checkbox"
            name="split"
            id="split"
            onChange={this.toggleSplit}
            value={+split}
          />
        </div>
        <div id="chart" style={{ overflow: 'hidden' }}>
          {split ? (
            datasets.map(dataset => (
              <div key={dataset.name}>
                <button onClick={this.getSnapshot}>Сделать снапшот</button>
                <ChartComponent width={width} height={height} datasets={[dataset]} />
              </div>
            ))
          ) : (
            <div>
              <button onClick={this.getSnapshot}>Сделать снапшот</button>
              <ChartComponent width={width} height={height} datasets={datasets} />
            </div>
          )}
        </div>
      </div>
    )
  }
}

export default App

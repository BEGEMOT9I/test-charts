import React, { PureComponent, ChangeEvent, MouseEvent } from 'react'
import { saveSvgAsPng } from 'save-svg-as-png'

import Data, { Dataset } from '../../data'
import RechartsPie from 'components/Recharts/Pie'
import RechartsLine from 'components/Recharts/Line'
import RechartsBar from 'components/Recharts/Bar'
import EchartsPie from 'components/Echarts/Pie'
import EchartsLine from 'components/Echarts/Line'
import EchartsBar from 'components/Echarts/Bar'
import Table from 'components/Table'

interface Props {}
interface State {
  libName: string
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
      component: {
        recharts: RechartsPie,
        echarts: EchartsPie
      }
    },
    {
      name: 'line',
      component: {
        recharts: RechartsLine,
        echarts: EchartsLine
      }
    },
    {
      name: 'bar',
      component: {
        recharts: RechartsBar,
        echarts: EchartsBar
      }
    },
    {
      name: 'table',
      component: Table
    }
  ]

  private libs = ['recharts', 'echarts']

  public constructor(props: Props) {
    super(props)
    this.state = {
      libName: this.libs[0],
      chartType: this.charts[0].name,
      width: document.body.offsetWidth,
      height: 400,
      split: false,
      datasets: [Data.generateDataset()]
    }

    this.addDataset = this.addDataset.bind(this)
    this.selectChart = this.selectChart.bind(this)
    this.selectLib = this.selectLib.bind(this)
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

  private selectLib(event: ChangeEvent<HTMLSelectElement>) {
    this.setState({ libName: event.target.value })
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
    const { width, height, datasets, chartType, split, libName } = this.state
    const Chart = this.charts.find(chart => chart.name === chartType)
    const ChartComponent = Chart.component[libName] || Chart.component

    return (
      <div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div>
            <button onClick={this.addDataset}>Добавить датасет</button>
          </div>
          <div>
            <label htmlFor="chartType">Тип графика: &nbsp;</label>
            <select name="chartType" id="chartType" onChange={this.selectChart}>
              {this.charts.map(chart => (
                <option key={chart.name} value={chart.name}>
                  {chart.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="split">Разбить данные&nbsp;</label>
            <input
              type="checkbox"
              name="split"
              id="split"
              onChange={this.toggleSplit}
              value={+split}
            />
          </div>
          <div>
            <label htmlFor="libName">Библиотека: &nbsp;</label>
            <select name="libName" id="libName" onChange={this.selectLib}>
              {this.libs.map(lib => (
                <option key={lib} value={lib}>
                  {lib}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div id="chart" style={{ overflow: 'hidden', marginTop: 20 }}>
          {split ? (
            datasets.map(dataset => (
              <div key={dataset.name}>
                {libName === 'recharts' && (
                  <button onClick={this.getSnapshot}>Сделать снапшот</button>
                )}
                <ChartComponent width={width} height={height} datasets={[dataset]} />
              </div>
            ))
          ) : (
            <div>
              {libName === 'recharts' && (
                <button onClick={this.getSnapshot}>Сделать снапшот</button>
              )}
              <ChartComponent width={width} height={height} datasets={datasets} />
            </div>
          )}
        </div>
      </div>
    )
  }
}

export default App

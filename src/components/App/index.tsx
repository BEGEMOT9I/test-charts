import React, { PureComponent, ChangeEvent, MouseEvent } from 'react'
import { saveSvgAsPng } from 'save-svg-as-png'

import Data, { Dataset } from '../../data'
import EchartsPie from 'components/Echarts/Pie'
import EchartsLine from 'components/Echarts/Line'
import EchartsBar from 'components/Echarts/Bar'
import Table from 'components/Table'

interface Props {}
interface State {
  width: number
  height: number
  datasets: Array<Dataset>
}

class App extends PureComponent<Props, State> {
  public constructor(props: Props) {
    super(props)

    this.state = {
      width: document.body.offsetWidth,
      height: 400,
      datasets: [Data.generateDataset()]
    }
  }

  public componentDidMount() {
    window.addEventListener('resize', this.resize)
  }

  private addDataset = () => {
    this.setState({ datasets: [...this.state.datasets, Data.generateDataset()] })
  }

  private resize = () => {
    this.setState({ width: document.body.offsetWidth })
  }

  public render() {
    const { width, height, datasets } = this.state

    return (
      <div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div>
            <button onClick={this.addDataset}>Добавить датасет</button>
          </div>
        </div>
        <div id="chart" style={{ overflow: 'hidden', marginTop: 20 }}>
          <EchartsLine width={width} height={height} datasets={datasets} />
          <EchartsBar width={width} height={height} datasets={datasets} />
          <EchartsPie width={width} height={height} datasets={datasets} />
        </div>
      </div>
    )
  }
}

export default App

import React, { PureComponent, ChangeEvent, MouseEvent } from 'react'
import { saveSvgAsPng } from 'save-svg-as-png'

import DataService, { FormattedDataset } from '../../lib/services/data'
import EchartsPie from 'components/Echarts/Pie'
import EchartsLine from 'components/Echarts/Line'
import EchartsBar from 'components/Echarts/Bar'
import Table from 'components/Table'

interface Props {}
interface State {
  width: number
  height: number
  dataset: FormattedDataset
}

class App extends PureComponent<Props, State> {
  public constructor(props: Props) {
    super(props)

    this.state = {
      width: document.body.offsetWidth,
      height: 400,
      dataset: []
    }
  }

  public componentDidMount() {
    this.getDataset()
    window.addEventListener('resize', this.resize)
  }

  private resize = () => {
    this.setState({ width: document.body.offsetWidth })
  }

  private async getDataset() {
    const dataset = await DataService.getDataset({ seriesCount: 2, levelsDataCount: [10, 10] })
    console.log(dataset)
    this.setState({ dataset })
  }

  public render() {
    const { width, height, dataset } = this.state

    return (
      <div>
        {/* <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div>
            <button onClick={this.addDataset}>Добавить датасет</button>
          </div>
        </div> */}
        <div id="chart" style={{ overflow: 'hidden', marginTop: 20 }}>
          <EchartsLine width={width} height={height} dataset={dataset} />
          <EchartsBar width={width} height={height} dataset={dataset} />
          <EchartsPie width={width} height={height} dataset={dataset} />
        </div>
      </div>
    )
  }
}

export default App

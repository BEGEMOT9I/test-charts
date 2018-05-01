import React, { PureComponent, ChangeEvent } from 'react'

import Data, { Dataset } from '../../data'

interface Props {
  width: number
  height: number
  datasets: Array<Dataset>
}
interface State {}

class Chart extends PureComponent<Props, State> {
  public render() {
    const { width, height, datasets } = this.props

    return (
      <table>
        <thead>
          <tr>
            <td />
            {datasets[0].data.map(point => <th key={point.name}>{point.name}</th>)}
          </tr>
        </thead>
        <tbody>
          {datasets.map(dataset => (
            <tr key={dataset.name}>
              <td>{dataset.name}</td>
              {dataset.data.map(point => <td key={point.name}>{point.value}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    )
  }
}

export default Chart

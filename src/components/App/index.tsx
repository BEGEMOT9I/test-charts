import React, { PureComponent } from 'react'

import Test from 'components/Test'

interface Props {}
interface State {
  width: number
  height: number
}

class App extends PureComponent<Props, State> {
  public constructor(props: Props) {
    super(props)

    this.state = {
      width: document.body.offsetWidth,
      height: 400
    }
  }

  public componentDidMount() {
    window.addEventListener('resize', this.resize)
  }

  private resize = () => {
    this.setState({ width: document.body.offsetWidth })
  }

  public render() {
    const { width, height } = this.state

    return (
      <div id="chart" style={{ overflow: 'hidden', marginTop: 20 }}>
        <Test width={width} height={height} />
      </div>
    )
  }
}

export default App

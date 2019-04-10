import EchartsPie from 'components/Echarts/Pie'
import EchartsLine from 'components/Echarts/Line'
import EchartsBar from 'components/Echarts/Bar'

const ELEMENTS = [EchartsLine, EchartsBar, EchartsPie]

const STAGES_OPTIONS = [
  { seriesCount: 1, levelsDataCount: [1] },
  { seriesCount: 1, levelsDataCount: [1] },
  { seriesCount: 1, levelsDataCount: [100] },
  { seriesCount: 1, levelsDataCount: [1000] },
  { seriesCount: 1, levelsDataCount: [10000] },
  { seriesCount: 10, levelsDataCount: [1] },
  { seriesCount: 100, levelsDataCount: [1] },
  { seriesCount: 300, levelsDataCount: [1] },
  { seriesCount: 100, levelsDataCount: [10] },
  { seriesCount: 10, levelsDataCount: [100] }
]

const STAGES = [{
  element: EchartsLine,
  substages: STAGES_OPTIONS
}, {
  element: EchartsBar,
  substages: STAGES_OPTIONS
}, {
  element: EchartsPie,
  substages: STAGES_OPTIONS.filter(options => options.levelsDataCount.every(count => count < 1000) && options.seriesCount < 1000)
}]

export { STAGES, ELEMENTS, STAGES_OPTIONS }
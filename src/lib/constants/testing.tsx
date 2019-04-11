import { LineChart, BarChart, PieChart } from 'components/Charts'

const ELEMENTS = [LineChart, BarChart, PieChart]

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

const STAGES = [
  {
    element: LineChart,
    substages: STAGES_OPTIONS
  },
  {
    element: BarChart,
    substages: STAGES_OPTIONS
  },
  {
    element: PieChart,
    substages: STAGES_OPTIONS.filter(options => options.levelsDataCount.every(count => count < 1000) && options.seriesCount < 1000)
  }
]

export { STAGES, ELEMENTS, STAGES_OPTIONS }
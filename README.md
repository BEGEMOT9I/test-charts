# plotly.js library testing.

## List of the charts:
- Line
- Bar
- Pie

## List of datasets formats:
See [`STAGES_OPTIONS`](https://github.com/BEGEMOT9I/test-charts/blob/__name__/src/lib/constants/testing.tsx).

## Result
Options | LineChart | BarChart | PieChart
- | - | - | -
Series: 1; Levels: [1] | 27ms | 11ms | 12ms
Series: 1; Levels: [100] | 40ms | 24ms | 159ms
Series: 1; Levels: [1000] | 65ms | 82ms | -
Series: 1; Levels: [10000] | 74ms | 468ms | -
Series: 10; Levels: [1] | 74ms | 82ms | 18ms
Series: 100; Levels: [1] | 239ms | 138ms | 48ms
Series: 300; Levels: [1] | 663ms | 486ms | 121ms
Series: 100; Levels: [10] | 272ms | 202ms | 134ms
Series: 10; Levels: [100] | 52ms | 72ms | 179ms

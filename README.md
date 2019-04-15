# AnyChart library testing.

## List of the charts:
- Line
- Bar
- Pie (partially - only with one seria)

## List of datasets formats:
See [`STAGES_OPTIONS`](https://github.com/BEGEMOT9I/test-charts/blob/__name__/src/lib/constants/testing.tsx).

## Result
Options | LineChart | BarChart | PieChart
- | - | - | -
Series: 1; Levels: [1] | 34ms | 24ms | 7ms
Series: 1; Levels: [100] | 115ms | 108ms | 107ms
Series: 1; Levels: [1000] | 165ms | 247ms | -
Series: 1; Levels: [10000] | 350ms | 974ms | -
Series: 10; Levels: [1] | 94ms | 183ms | 7ms
Series: 100; Levels: [1] | 319ms | 285ms | 7ms
Series: 300; Levels: [1] | 844ms | 699ms | 9ms
Series: 100; Levels: [10] | 288ms | 331ms | 28ms
Series: 10; Levels: [100] | 130ms | 202ms | 92ms

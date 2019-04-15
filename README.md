# Echarts (with adapter) library testing.

## List of the charts:
- Line
- Bar
- Pie

## List of datasets formats:
See [`STAGES_OPTIONS`](https://github.com/BEGEMOT9I/test-charts/blob/__name__/src/lib/constants/testing.tsx).

## Result
Options | LineChart | BarChart | PieChart
- | - | - | -
Series: 1; Levels: [1] | 56ms | 41ms | 55ms
Series: 1; Levels: [100] | 67ms | 48ms | 106ms
Series: 1; Levels: [1000] | 85ms | 100ms | -
Series: 1; Levels: [10000] | 232ms | 469ms | -
Series: 10; Levels: [1] | 99ms | 71ms | 56ms
Series: 100; Levels: [1] | 391ms | 296ms | 109ms
Series: 300; Levels: [1] | 3042ms | 2935ms | 247ms
Series: 100; Levels: [10] | 453ms | 322ms | 298ms
Series: 10; Levels: [100] | 129ms | 111ms | 249ms
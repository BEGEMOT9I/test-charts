# Highcharts library testing.

## List of the charts:
- Line
- Bar
- Pie

## List of datasets formats:
See [`STAGES_OPTIONS`](https://github.com/BEGEMOT9I/test-charts/blob/__name__/src/lib/constants/testing.tsx).

## Result
Options | LineChart | BarChart | PieChart
- | - | - | -
Series: 1; Levels: [1] | 11ms | 10ms | 4ms
Series: 1; Levels: [100] | 28ms | 25ms | 47ms
Series: 1; Levels: [1000] | 37ms | 61ms | -
Series: 1; Levels: [10000] | 144ms | 330ms | -
Series: 10; Levels: [1] | 102ms | 157ms | 12ms
Series: 100; Levels: [1] | 119ms | 94ms | 78ms
Series: 300; Levels: [1] | 351ms | 341ms | 248ms
Series: 100; Levels: [10] | 149ms | 128ms | 540ms
Series: 10; Levels: [100] | 60ms | 62ms | 549ms

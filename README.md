# Highcharts (with adapter) library testing.

## List of the charts:
- Line
- Bar
- Pie

## List of datasets formats:
See [`STAGES_OPTIONS`](https://github.com/BEGEMOT9I/test-charts/blob/__name__/src/lib/constants/testing.tsx).

## Result
Options | LineChart | BarChart | PieChart
| - | - | - | - |
Series: 1; Levels: [1] | 16ms | 8ms | 7ms
Series: 1; Levels: [100] | 31ms | 26ms | 54ms
Series: 1; Levels: [1000] | 50ms | 69ms | -
Series: 1; Levels: [10000] | 158ms | 366ms | -
Series: 10; Levels: [1] | 150ms | 304ms | 28ms
Series: 100; Levels: [1] | 122ms | 131ms | 89ms
Series: 300; Levels: [1] | 389ms | 426ms | 272ms
Series: 100; Levels: [10] | 230ms | 246ms | 639ms
Series: 10; Levels: [100] | 117ms | 115ms | 536ms

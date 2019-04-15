# Echarts library testing.

## List of the charts:
- Line
- Bar
- Pie

## List of datasets formats:
See [`STAGES_OPTIONS`](https://github.com/BEGEMOT9I/test-charts/blob/__name__/src/lib/constants/testing.tsx).

## Result:
Options | LineChart | BarChart | PieChart
| - | - | - | - |
Series: 1; Levels: [1] | 9ms | 5ms | 5ms
Series: 1; Levels: [100] | 22ms | 10ms | 73ms
Series: 1; Levels: [1000] | 20ms | 51ms | -
Series: 1; Levels: [10000] | 96ms | 221ms | -
Series: 10; Levels: [1] | 76ms | 26ms | 9ms
Series: 100; Levels: [1] | 287ms | 202ms | 78ms
Series: 300; Levels: [1] | 3088ms | 2584ms | 162ms
Series: 100; Levels: [10] | 303ms | 222ms | 135ms
Series: 10; Levels: [100] | 42ms | 29ms | 121ms

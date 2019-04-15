# react-vis library testing.

## List of the charts:
- Line
- Bar
- Pie

## List of datasets formats:
See [`STAGES_OPTIONS`](https://github.com/BEGEMOT9I/test-charts/blob/__name__/src/lib/constants/testing.tsx).

## Result:
Options | LineChart | BarChart | PieChart
| - | - | - | - |
Series: 1; Levels: [1] | 9ms | 5ms | 153ms
Series: 1; Levels: [100] | 72ms | 36ms | 26ms
Series: 1; Levels: [1000] | 264ms | 265ms | -
Series: 1; Levels: [10000] | 2206ms | 2911ms | -
Series: 10; Levels: [1] | 149ms | 159ms | 12ms
Series: 100; Levels: [1] | 49ms | 57ms | 43ms
Series: 300; Levels: [1] | 79ms | 152ms | 125ms
Series: 100; Levels: [10] | 41ms | 3362ms | 107ms
Series: 10; Levels: [100] | 40ms | 81ms | 82ms

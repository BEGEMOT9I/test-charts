# plotly.js (with adapter) library testing.

## List of the charts:
- Line
- Bar
- Pie

## List of datasets formats:
See [`STAGES_OPTIONS`](https://github.com/BEGEMOT9I/test-charts/blob/__name__/src/lib/constants/testing.tsx).

## Result:
Options | LineChart | BarChart | PieChart
| - | - | - | - |
Series: 1; Levels: [1] | 19ms | 13ms | 13ms
Series: 1; Levels: [100] | 41ms | 24ms | 157ms
Series: 1; Levels: [1000] | 50ms | 76ms | -
Series: 1; Levels: [10000] | 69ms | 542ms | -
Series: 10; Levels: [1] | 71ms | 81ms | 17ms
Series: 100; Levels: [1] | 243ms | 156ms | 46ms
Series: 300; Levels: [1] | 636ms | 446ms | 148ms
Series: 100; Levels: [10] | 264ms | 207ms | 139ms
Series: 10; Levels: [100] | 49ms | 85ms | 197ms

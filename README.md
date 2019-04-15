# Victory library testing.

## List of the charts:
- Line
- Bar (without tooltip)
- Pie

## List of datasets formats:
See [`STAGES_OPTIONS`](https://github.com/BEGEMOT9I/test-charts/blob/__name__/src/lib/constants/testing.tsx).

## Result:
Options | LineChart | BarChart | PieChart
| - | - | - | - |
Series: 1; Levels: [1] | 51ms | 19ms | 13ms
Series: 1; Levels: [100] | 175ms | 142ms | 71ms
Series: 1; Levels: [1000] | 936ms | 1227ms | -
Series: 1; Levels: [10000] | 8397ms | 10204ms | -
Series: 10; Levels: [1] | 533ms | 186ms | 22ms
Series: 100; Levels: [1] | 224ms | 482ms | 81ms
Series: 300; Levels: [1] | 632ms | 1328ms | 219ms
Series: 100; Levels: [10] | 366ms | 793ms | 329ms
Series: 10; Levels: [100] | 238ms | 472ms | 306ms

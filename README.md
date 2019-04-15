# AnyChart (with adapter) library testing.

## List of the charts:
- Line
- Bar
- Pie (partially - only with one seria)

All charts are rendered with default series names.

## List of datasets formats:
See [`STAGES_OPTIONS`](https://github.com/BEGEMOT9I/test-charts/blob/__name__/src/lib/constants/testing.tsx).

## Result:
Options | LineChart | BarChart | PieChart
| - | - | - | - |
Series: 1; Levels: [1] | 60ms | 34ms | 12ms
Series: 1; Levels: [100] | 140ms | 124ms | 116ms
Series: 1; Levels: [1000] | 175ms | 269ms | -
Series: 1; Levels: [10000] | 391ms | 1042ms | -
Series: 10; Levels: [1] | 109ms | 309ms | 16ms
Series: 100; Levels: [1] | 334ms | 295ms | 11ms
Series: 300; Levels: [1] | 900ms | 805ms | 9ms
Series: 100; Levels: [10] | 763ms | 601ms | 30ms
Series: 10; Levels: [100] | 208ms | 314ms | 97ms

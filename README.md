# amCharts library testing.

## List of the charts:
- Line
- Bar
- Pie

## List of datasets formats:
See [`STAGES_OPTIONS`](https://github.com/BEGEMOT9I/test-charts/blob/__name__/src/lib/constants/testing.tsx).

## Result:
Options | LineChart | BarChart | PieChart
| - | - | - | - |
Series: 1; Levels: [1] | 229ms | 194ms | 112ms
Series: 1; Levels: [100] | 294ms | 294ms | 701ms
Series: 1; Levels: [1000] | 495ms | 995ms | -
Series: 1; Levels: [10000] | 990ms | 15057ms | -
Series: 10; Levels: [1] | 346ms | 426ms | 211ms
Series: 100; Levels: [1] | 1521ms | 1429ms | 1261ms
Series: 300; Levels: [1] | 4214ms | 5250ms | 4880ms
Series: 100; Levels: [10] | 1712ms | 2645ms | 8902ms
Series: 10; Levels: [100] | 396ms | 1585ms | 6749ms

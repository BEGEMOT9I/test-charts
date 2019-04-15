# c3 library testing.

## List of the charts:
- Line
- Bar
- Pie (partially)

## List of datasets formats:
See [`STAGES_OPTIONS`](https://github.com/BEGEMOT9I/test-charts/blob/__name__/src/lib/constants/testing.tsx).

## Result:
Options | LineChart | BarChart | PieChart
| - | - | - | - |
Series: 1; Levels: [1] | 17ms | 13ms | 30ms
Series: 1; Levels: [100] | 94ms | 74ms | 34ms
Series: 1; Levels: [1000] | 1403ms | 1458ms | -
Series: 1; Levels: [10000] | 13406ms | 25785ms | -
Series: 10; Levels: [1] | 776ms | 928ms | 42ms
Series: 100; Levels: [1] | 94ms | 78ms | 1733ms
Series: 300; Levels: [1] | 210ms | 187ms | 623ms
Series: 100; Levels: [10] | 931ms | 120ms | 152ms
Series: 10; Levels: [100] | 246ms | 108ms | 55ms

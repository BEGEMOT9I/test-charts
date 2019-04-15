# Chart.js library testing.

## List of the charts:
- Line
- Bar
- Pie

## List of datasets formats:
See [`STAGES_OPTIONS`](https://github.com/BEGEMOT9I/test-charts/blob/__name__/src/lib/constants/testing.tsx).

## Result
Options | LineChart | BarChart | PieChart
- | - | - | -
Series: 1; Levels: [1] | 7ms | 5ms | 1ms
Series: 1; Levels: [100] | 8ms | 5ms | 5ms
Series: 1; Levels: [1000] | 45ms | 27ms | -
Series: 1; Levels: [10000] | 482ms | 195ms | -
Series: 10; Levels: [1] | 58ms | 16ms | 2ms
Series: 100; Levels: [1] | 23ms | 29ms | 46ms
Series: 300; Levels: [1] | 25ms | 40ms | 106ms
Series: 100; Levels: [10] | 63ms | 20ms | 18ms
Series: 10; Levels: [100] | 19ms | 15ms | 14ms

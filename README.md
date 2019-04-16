# Testing charts libraries.

## List of included libs:
- [X] amCharts
- [X] AnyChart
- [X] AnyChart (with React adapter)
- [X] c3
- [X] Chart.js
- [x] ECharts
- [x] ECharts (with React adapter)
- [X] Highcharts
- [X] Highcharts (with React adapter)
- [X] plotly.js
- [X] plotly.js (with React adapter)
- [X] react-vis (React)
- [X] Victory (React)

## Local testing:
- `git checkout <library name>`
- `yarn install`
- `yarn start`
- Open the [`localhost:3000`](http://0.0.0.0:3000)

## Result:
`(with adapter)` means that the library version has been tested with the React-component.

### amCharts
| Options                    | LineChart | BarChart | PieChart |
| -------------------------- | --------- | -------- | -------- |
| Series: 1; Levels: [1]     | 229ms     | 194ms    | 112ms    |
| Series: 1; Levels: [100]   | 294ms     | 294ms    | 701ms    |
| Series: 1; Levels: [1000]  | 495ms     | 995ms    | -        |
| Series: 1; Levels: [10000] | 990ms     | 15057ms  | -        |
| Series: 10; Levels: [1]    | 346ms     | 426ms    | 211ms    |
| Series: 100; Levels: [1]   | 1521ms    | 1429ms   | 1261ms   |
| Series: 300; Levels: [1]   | 4214ms    | 5250ms   | 4880ms   |
| Series: 100; Levels: [10]  | 1712ms    | 2645ms   | 8902ms   |
| Series: 10; Levels: [100]  | 396ms     | 1585ms   | 6749ms   |
### AnyChart
| Options                    | LineChart | BarChart | PieChart |
| -------------------------- | --------- | -------- | -------- |
| Series: 1; Levels: [1]     | 34ms      | 24ms     | 7ms      |
| Series: 1; Levels: [100]   | 115ms     | 108ms    | 107ms    |
| Series: 1; Levels: [1000]  | 165ms     | 247ms    | -        |
| Series: 1; Levels: [10000] | 350ms     | 974ms    | -        |
| Series: 10; Levels: [1]    | 94ms      | 183ms    | 7ms      |
| Series: 100; Levels: [1]   | 319ms     | 285ms    | 7ms      |
| Series: 300; Levels: [1]   | 844ms     | 699ms    | 9ms      |
| Series: 100; Levels: [10]  | 288ms     | 331ms    | 28ms     |
| Series: 10; Levels: [100]  | 130ms     | 202ms    | 92ms     |
### AnyChart (with adapter)
| Options                    | LineChart | BarChart | PieChart |
| -------------------------- | --------- | -------- | -------- |
| Series: 1; Levels: [1]     | 60ms      | 34ms     | 12ms     |
| Series: 1; Levels: [100]   | 140ms     | 124ms    | 116ms    |
| Series: 1; Levels: [1000]  | 175ms     | 269ms    | -        |
| Series: 1; Levels: [10000] | 391ms     | 1042ms   | -        |
| Series: 10; Levels: [1]    | 109ms     | 309ms    | 16ms     |
| Series: 100; Levels: [1]   | 334ms     | 295ms    | 11ms     |
| Series: 300; Levels: [1]   | 900ms     | 805ms    | 9ms      |
| Series: 100; Levels: [10]  | 763ms     | 601ms    | 30ms     |
| Series: 10; Levels: [100]  | 208ms     | 314ms    | 97ms     |
### c3
| Options                    | LineChart | BarChart | PieChart |
| -------------------------- | --------- | -------- | -------- |
| Series: 1; Levels: [1]     | 17ms      | 13ms     | 30ms     |
| Series: 1; Levels: [100]   | 94ms      | 74ms     | 34ms     |
| Series: 1; Levels: [1000]  | 1403ms    | 1458ms   | -        |
| Series: 1; Levels: [10000] | 13406ms   | 25785ms  | -        |
| Series: 10; Levels: [1]    | 776ms     | 928ms    | 42ms     |
| Series: 100; Levels: [1]   | 94ms      | 78ms     | 1733ms   |
| Series: 300; Levels: [1]   | 210ms     | 187ms    | 623ms    |
| Series: 100; Levels: [10]  | 931ms     | 120ms    | 152ms    |
| Series: 10; Levels: [100]  | 246ms     | 108ms    | 55ms     |
### Chart.js
| Options                    | LineChart | BarChart | PieChart |
| -------------------------- | --------- | -------- | -------- |
| Series: 1; Levels: [1]     | 7ms       | 5ms      | 1ms      |
| Series: 1; Levels: [100]   | 8ms       | 5ms      | 5ms      |
| Series: 1; Levels: [1000]  | 45ms      | 27ms     | -        |
| Series: 1; Levels: [10000] | 482ms     | 195ms    | -        |
| Series: 10; Levels: [1]    | 58ms      | 16ms     | 2ms      |
| Series: 100; Levels: [1]   | 23ms      | 29ms     | 46ms     |
| Series: 300; Levels: [1]   | 25ms      | 40ms     | 106ms    |
| Series: 100; Levels: [10]  | 63ms      | 20ms     | 18ms     |
| Series: 10; Levels: [100]  | 19ms      | 15ms     | 14ms     |
### Echarts
| Options                    | LineChart | BarChart | PieChart |
| -------------------------- | --------- | -------- | -------- |
| Series: 1; Levels: [1]     | 9ms       | 5ms      | 5ms      |
| Series: 1; Levels: [100]   | 22ms      | 10ms     | 73ms     |
| Series: 1; Levels: [1000]  | 20ms      | 51ms     | -        |
| Series: 1; Levels: [10000] | 96ms      | 221ms    | -        |
| Series: 10; Levels: [1]    | 76ms      | 26ms     | 9ms      |
| Series: 100; Levels: [1]   | 287ms     | 202ms    | 78ms     |
| Series: 300; Levels: [1]   | 3088ms    | 2584ms   | 162ms    |
| Series: 100; Levels: [10]  | 303ms     | 222ms    | 135ms    |
| Series: 10; Levels: [100]  | 42ms      | 29ms     | 121ms    |
### Echarts (with adapter)
| Options                    | LineChart | BarChart | PieChart |
| -------------------------- | --------- | -------- | -------- |
| Series: 1; Levels: [1]     | 56ms      | 41ms     | 55ms     |
| Series: 1; Levels: [100]   | 67ms      | 48ms     | 106ms    |
| Series: 1; Levels: [1000]  | 85ms      | 100ms    | -        |
| Series: 1; Levels: [10000] | 232ms     | 469ms    | -        |
| Series: 10; Levels: [1]    | 99ms      | 71ms     | 56ms     |
| Series: 100; Levels: [1]   | 391ms     | 296ms    | 109ms    |
| Series: 300; Levels: [1]   | 3042ms    | 2935ms   | 247ms    |
| Series: 100; Levels: [10]  | 453ms     | 322ms    | 298ms    |
| Series: 10; Levels: [100]  | 129ms     | 111ms    | 249ms    |
### Highcharts
| Options                    | LineChart | BarChart | PieChart |
| -------------------------- | --------- | -------- | -------- |
| Series: 1; Levels: [1]     | 11ms      | 10ms     | 4ms      |
| Series: 1; Levels: [100]   | 28ms      | 25ms     | 47ms     |
| Series: 1; Levels: [1000]  | 37ms      | 61ms     | -        |
| Series: 1; Levels: [10000] | 144ms     | 330ms    | -        |
| Series: 10; Levels: [1]    | 102ms     | 157ms    | 12ms     |
| Series: 100; Levels: [1]   | 119ms     | 94ms     | 78ms     |
| Series: 300; Levels: [1]   | 351ms     | 341ms    | 248ms    |
| Series: 100; Levels: [10]  | 149ms     | 128ms    | 540ms    |
| Series: 10; Levels: [100]  | 60ms      | 62ms     | 549ms    |
### Highcharts (with adapter)
| Options                    | LineChart | BarChart | PieChart |
| -------------------------- | --------- | -------- | -------- |
| Series: 1; Levels: [1]     | 16ms      | 8ms      | 7ms      |
| Series: 1; Levels: [100]   | 31ms      | 26ms     | 54ms     |
| Series: 1; Levels: [1000]  | 50ms      | 69ms     | -        |
| Series: 1; Levels: [10000] | 158ms     | 366ms    | -        |
| Series: 10; Levels: [1]    | 150ms     | 304ms    | 28ms     |
| Series: 100; Levels: [1]   | 122ms     | 131ms    | 89ms     |
| Series: 300; Levels: [1]   | 389ms     | 426ms    | 272ms    |
| Series: 100; Levels: [10]  | 230ms     | 246ms    | 639ms    |
| Series: 10; Levels: [100]  | 117ms     | 115ms    | 536ms    |
### plotly.js
| Options                    | LineChart | BarChart | PieChart |
| -------------------------- | --------- | -------- | -------- |
| Series: 1; Levels: [1]     | 27ms      | 11ms     | 12ms     |
| Series: 1; Levels: [100]   | 40ms      | 24ms     | 159ms    |
| Series: 1; Levels: [1000]  | 65ms      | 82ms     | -        |
| Series: 1; Levels: [10000] | 74ms      | 468ms    | -        |
| Series: 10; Levels: [1]    | 74ms      | 82ms     | 18ms     |
| Series: 100; Levels: [1]   | 239ms     | 138ms    | 48ms     |
| Series: 300; Levels: [1]   | 663ms     | 486ms    | 121ms    |
| Series: 100; Levels: [10]  | 272ms     | 202ms    | 134ms    |
| Series: 10; Levels: [100]  | 52ms      | 72ms     | 179ms    |
### plotly.js (with adapter)
| Options                    | LineChart | BarChart | PieChart |
| -------------------------- | --------- | -------- | -------- |
| Series: 1; Levels: [1]     | 19ms      | 13ms     | 13ms     |
| Series: 1; Levels: [100]   | 41ms      | 24ms     | 157ms    |
| Series: 1; Levels: [1000]  | 50ms      | 76ms     | -        |
| Series: 1; Levels: [10000] | 69ms      | 542ms    | -        |
| Series: 10; Levels: [1]    | 71ms      | 81ms     | 17ms     |
| Series: 100; Levels: [1]   | 243ms     | 156ms    | 46ms     |
| Series: 300; Levels: [1]   | 636ms     | 446ms    | 148ms    |
| Series: 100; Levels: [10]  | 264ms     | 207ms    | 139ms    |
| Series: 10; Levels: [100]  | 49ms      | 85ms     | 197ms    |
### react-vis
| Options                    | LineChart | BarChart | PieChart |
| -------------------------- | --------- | -------- | -------- |
| Series: 1; Levels: [1]     | 9ms       | 5ms      | 153ms    |
| Series: 1; Levels: [100]   | 72ms      | 36ms     | 26ms     |
| Series: 1; Levels: [1000]  | 264ms     | 265ms    | -        |
| Series: 1; Levels: [10000] | 2206ms    | 2911ms   | -        |
| Series: 10; Levels: [1]    | 149ms     | 159ms    | 12ms     |
| Series: 100; Levels: [1]   | 49ms      | 57ms     | 43ms     |
| Series: 300; Levels: [1]   | 79ms      | 152ms    | 125ms    |
| Series: 100; Levels: [10]  | 41ms      | 3362ms   | 107ms    |
| Series: 10; Levels: [100]  | 40ms      | 81ms     | 82ms     |
### Victory
| Options                    | LineChart | BarChart | PieChart |
| -------------------------- | --------- | -------- | -------- |
| Series: 1; Levels: [1]     | 51ms      | 19ms     | 13ms     |
| Series: 1; Levels: [100]   | 175ms     | 142ms    | 71ms     |
| Series: 1; Levels: [1000]  | 936ms     | 1227ms   | -        |
| Series: 1; Levels: [10000] | 8397ms    | 10204ms  | -        |
| Series: 10; Levels: [1]    | 533ms     | 186ms    | 22ms     |
| Series: 100; Levels: [1]   | 224ms     | 482ms    | 81ms     |
| Series: 300; Levels: [1]   | 632ms     | 1328ms   | 219ms    |
| Series: 100; Levels: [10]  | 366ms     | 793ms    | 329ms    |
| Series: 10; Levels: [100]  | 238ms     | 472ms    | 306ms    |
### Table of times (in ms):
| Options                    | amCharts | AnyChart | AnyChart (with adapter) | c3    | Chart.js | Echarts | Echarts (with adapter) | Highcharts | Highcharts (with adapter) | plotly.js | plotly.js (with adapter) | react-vis | victory |
| -------------------------- | -------- | -------- | ----------------------- | ----- | -------- | ------- | ---------------------- | ---------- | ------------------------- | --------- | ------------------------ | --------- | ------- |
| Series: 1; Levels: [1]     | 535      | 65       | 106                     | 60    | 13       | 19      | 152                    | 25         | 31                        | 50        | 45                       | 167       | 83      |
| Series: 1; Levels: [100]   | 1289     | 330      | 380                     | 202   | 18       | 105     | 221                    | 100        | 111                       | 223       | 222                      | 134       | 388     |
| Series: 1; Levels: [1000]  | 1490     | 412      | 444                     | 2861  | 72       | 71      | 185                    | 98         | 119                       | 147       | 136                      | 529       | 2163    |
| Series: 1; Levels: [10000] | 16047    | 1324     | 1433                    | 39191 | 677      | 317     | 701                    | 474        | 524                       | 542       | 611                      | 5117      | 18601   |
| Series: 10; Levels: [1]    | 983      | 284      | 434                     | 1746  | 76       | 111     | 226                    | 271        | 482                       | 174       | 169                      | 320       | 741     |
| Series: 100; Levels: [1]   | 4211     | 611      | 640                     | 1905  | 98       | 567     | 797                    | 291        | 342                       | 425       | 445                      | 149       | 787     |
| Series: 300; Levels: [1]   | 14344    | 1552     | 1714                    | 1020  | 171      | 5834    | 6224                   | 940        | 1087                      | 1270      | 1230                     | 356       | 2179    |
| Series: 100; Levels: [10]  | 13259    | 647      | 1394                    | 1203  | 101      | 660     | 1073                   | 816        | 1115                      | 608       | 670                      | 3510      | 1488    |
| Series: 10; Levels: [100]  | 8730     | 424      | 619                     | 409   | 48       | 192     | 489                    | 671        | 758                       | 303       | 331                      | 203       | 1016    |
### Table of places (by "Table of times"):
| Options                    | amCharts | AnyChart | AnyChart (with adapter) | c3  | Chart.js | Echarts | Echarts (with adapter) | Highcharts | Highcharts (with adapter) | plotly.js | plotly.js (with adapter) | react-vis | victory |
| -------------------------- | -------- | -------- | ----------------------- | --- | -------- | ------- | ---------------------- | ---------- | ------------------------- | --------- | ------------------------ | --------- | ------- |
| Series: 1; Levels: [1]     | 13       | 8        | 10                      | 7   | 1        | 2       | 11                     | 3          | 4                         | 6         | 5                        | 12        | 9       |
| Series: 1; Levels: [100]   | 13       | 10       | 11                      | 6   | 1        | 3       | 7                      | 2          | 4                         | 9         | 8                        | 5         | 12      |
| Series: 1; Levels: [1000]  | 11       | 8        | 9                       | 13  | 2        | 1       | 7                      | 3          | 4                         | 6         | 5                        | 10        | 12      |
| Series: 1; Levels: [10000] | 11       | 8        | 9                       | 13  | 6        | 1       | 7                      | 2          | 3                         | 4         | 5                        | 10        | 12      |
| Series: 10; Levels: [1]    | 12       | 7        | 9                       | 13  | 1        | 2       | 5                      | 6          | 10                        | 4         | 3                        | 8         | 11      |
| Series: 100; Levels: [1]   | 13       | 8        | 9                       | 12  | 1        | 7       | 11                     | 3          | 4                         | 5         | 6                        | 2         | 10      |
| Series: 300; Levels: [1]   | 13       | 8        | 9                       | 4   | 1        | 11      | 12                     | 3          | 5                         | 7         | 6                        | 2         | 10      |
| Series: 100; Levels: [10]  | 13       | 3        | 10                      | 9   | 1        | 4       | 7                      | 6          | 8                         | 2         | 5                        | 12        | 11      |
| Series: 10; Levels: [100]  | 13       | 7        | 9                       | 6   | 1        | 2       | 8                      | 10         | 11                        | 4         | 5                        | 3         | 12      |
### Table of average place and result place (by "Table of places"):
| Library                   | Average place | Result place |
| ------------------------- | ------------- | ------------ |
| amCharts                  | 12.44         | __13__       |
| AnyChart                  | 7.44          | __8__        |
| AnyChart (with adapter)   | 9.44          | __11__       |
| c3                        | 9.22          | __10__       |
| Chart.js                  | 1.67          | __1__        |
| Echarts                   | 3.67          | __2__        |
| Echarts (with adapter)    | 8.33          | __9__        |
| Highcharts                | 4.22          | __3__        |
| Highcharts (with adapter) | 5.89          | __6__        |
| plotly.js                 | 5.22          | __4__        |
| plotly.js (with adapter)  | 5.33          | __5__        |
| react-vis                 | 7.11          | __7__        |
| victory                   | 11            | __12__       |
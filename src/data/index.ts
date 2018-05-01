export interface Dataset {
  name: string
  nameKey: string
  dataKey: string
  color: string
  data: Array<{ name: string; value: number }>
}

class Data {
  public columns = [
    'Январь',
    'Февраль',
    'Март',
    'Апрель',
    'Май',
    'Июнь',
    'Июль',
    'Август',
    'Сентябрь',
    'Октябрь',
    'Ноябрь',
    'Декабрь'
  ]
  public rowName = 'Данные'
  public max = 1000
  public min = 0

  public constructor() {
    this.generateDataset()
  }

  public generateDataset({ random = true }: { random?: boolean } = {}): Dataset {
    let initialValue = 0
    return {
      name: `${this.rowName}-${Math.random()}`,
      dataKey: 'value',
      nameKey: 'name',
      color: `#${Math.random()
        .toString(16)
        .substr(-6)}`,
      data: this.columns.map((column, index) => ({
        name: column,
        value: random
          ? Math.round(Math.random() * this.max)
          : Math.round((initialValue += this.max / this.columns.length))
      }))
    }
  }
}

export default new Data()

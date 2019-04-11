interface Level {
  name: string
  labels: Array<string>
}

interface Seria {
  name: string
}

export type NestedArray<ValueType> = Array<Array<ValueType> | ValueType>
export type Levels = Array<Level>
export type Series = Array<Seria>
export type IncapsulatedDataset<ValueType> = Array<NestedArray<ValueType>>
export type FlatDatasetWithoutLabels<ValueType> = Array<Array<ValueType>>
export type FlatDatasetWithLabels<ValueType, LabelType> = Array<Array<ValueType | LabelType>>

export interface Result<TDataset> {
  series: Series
  levels: Levels
  dataset: TDataset
}

export { default as getLevels } from './getLevels'
export { default as getSeries } from './getSeries'
export { default as getIncapsulatedDataset } from './getIncapsulatedDataset'
export { default as getFlatDatasetWithoutLabels } from './getFlatDatasetWithoutLabels'
export { default as getFlatDatasetWithLabels } from './getFlatDatasetWithLabels'

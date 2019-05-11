const divider = 100000
const toFixedLength = divider.toString().length - 1

export const VALUE_REG_EXP = /(item|seria)-(\d+\.\d+)$/

export default function getName(prefix: string, index: number) {
  return `${prefix}-${(index / divider).toFixed(toFixedLength)}`
}

export function getSeriaName(index: number) {
  return getName('seria', index)
}

export function getLevelName(index: number) {
  return getName('level', index)
}

export function getLevelDataItem(level: number, index: number) {
  return `${getName('level', level)}-${getName('item', index)}`
}

export function getItemInfoByName(label: string) {
  return Number((label.match(VALUE_REG_EXP) as Array<string>)[2]) / divider
}

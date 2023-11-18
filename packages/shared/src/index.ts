/**
 * 判断是否为数组
 */
export const isArray = Array.isArray

export const isObject = (value: unknown) => {
  return value !== null && typeof value === 'object'
}

/**
 * 判断值是否有变化
 * @param value unknown
 * @param oldValue unknown
 * @returns boolean
 */
export const hasChanged = (value: unknown, oldValue: unknown): boolean => {
  return !Object.is(value, oldValue)
}

/**
 * 判断是否为函数
 * @param value unknown
 * @returns boolean
 */
export const isFunction = (value: unknown): value is Function => {
  return typeof value === 'function'
}

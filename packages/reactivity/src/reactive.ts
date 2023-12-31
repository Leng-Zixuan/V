import { isObject } from '../../shared/src'
import { mutableHandlers } from './baseHandlers'

/**
 * 响应性 Map 缓存对象
 * key: target
 * value: proxy
 */
export const reactiveMap = new WeakMap<object, any>()

/**
 * 为复杂数据类型，创建响应式对象
 * @param target 被代理对象
 * @returns 代理对象
 */
export function reactive(target: object) {
  return createReactiveObject(target, mutableHandlers, reactiveMap)
}

/**
 * 创建响应式对象
 * @param target 被代理对象
 * @param baseHandlers handler
 * @param proxyMap 响应式map缓存对象
 * @returns 代理对象
 */
function createReactiveObject(
  target: object,
  baseHandlers: ProxyHandler<any>,
  proxyMap: WeakMap<object, any>
) {
  // 如果该实例已经被代理，则直接读取即可
  const existingProxy = proxyMap.get(target)
  if (existingProxy) {
    return existingProxy
  }

  // 未被代理则生成proxy实例
  const proxy = new Proxy(target, baseHandlers)

  // 缓存对象
  proxyMap.set(target, proxy)
  return proxy
}

export function toReactive<T extends unknown>(value: T): T {
  return isObject(value) ? reactive(value as object) : value
}

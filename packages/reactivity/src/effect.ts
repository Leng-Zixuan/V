type KeyToDepMap = Map<any, ReactiveEffect>
/**
 * 收集所有依赖的WeakMap实例
 * 1. key: 响应式对象
 * 2. value: Map 对象
 *    Map： {
 *      key: 响应式对象的指定属性
 *      value: 指定 对象的 指定 属性的 执行函数 fn
 *    }
 */
const targetMap = new WeakMap<any, KeyToDepMap>()

export function effect<T = any>(fn: () => T) {
  const _effect = new ReactiveEffect(fn)
  _effect.run()
}

export let activeEffect: ReactiveEffect | undefined

export class ReactiveEffect<T = any> {
  constructor(public fn: () => T) {}

  run() {
    activeEffect = this
    return this.fn()
  }
}

/**
 * 收集依赖
 * @param target WeakMap的Key
 * @param key 代理对象的key，当依赖被触发时，需要根据该key获取
 */
export function track(target: object, key: unknown) {
  // 如果当前响应性对象不存在执行函数，则直接return
  if (!activeEffect) return

  // 尝试从targetMap中，根据target获取Map对象
  let depsMap = targetMap.get(target)

  // 如果获取不到Map对象， 则生成新的Map对象，并把该对象赋值给对应的value
  if (!depsMap) {
    targetMap.set(target, (depsMap = new Map()))
  }

  // 为指定Map对象，指定key，并设置回调函数
  depsMap.set(key, activeEffect)
  console.log(targetMap)
}

/**
 * 触发依赖
 * @param target
 * @param key
 * @param newValue
 */
export function trigger(target: object, key: unknown, newValue: unknown) {
  console.log('trigger: 触发依赖')
}

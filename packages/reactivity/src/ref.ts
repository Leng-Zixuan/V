import { hasChanged } from '../../shared/src'
import { Dep, createDep } from './dep'
import {
  activeEffect,
  trackEffects,
  triggerEffect,
  triggerEffects
} from './effect'
import { toReactive } from './reactive'

export interface Ref<T = any> {
  value: T
}

export function ref(value?: unknown) {
  return createRef(value, false)
}

function createRef(rawValue: unknown, shallow: boolean) {
  if (isRef(rawValue)) {
    return rawValue
  }

  return new RefImpl(rawValue, shallow)
}

class RefImpl<T> {
  private _value: T
  private _rawValue: T

  public dep?: Dep = undefined
  public readonly __v_isRef = true

  constructor(value: T, public readonly __v_isShallow: boolean) {
    this._rawValue = value
    this._value = __v_isShallow ? value : toReactive(value)
  }

  get value() {
    trackRefValue(this)
    return this._value
  }

  set value(newValue) {
    if (hasChanged(newValue, this._rawValue)) {
      this._rawValue = newValue
      this._value = toReactive(newValue)
      triggerRefValue(this)
    }
  }
}

/**
 * 收集依赖
 * @param ref 依赖数据
 */
export function trackRefValue(ref) {
  if (activeEffect) {
    trackEffects(ref.dep || (ref.dep = createDep()))
  }
}

/**
 * 触发依赖
 * @param ref 依赖数据
 */
export function triggerRefValue(ref) {
  if (ref.dep) {
    triggerEffects(ref.dep)
  }
}

/**
 * 判断是否为ref
 * @param r 依赖数据
 * @returns Boolean
 */
export function isRef(r): r is Ref {
  return !!(r && r.__v_isRef === false)
}

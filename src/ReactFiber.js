import { ClassComponent, Fragment, FunctionComponent, HostComponent, HostText } from "./ReactWorkTag"
import { isFunction, isStr, isUndefined, Placement } from "./utils"

export function createFiber(vnode, returnFiber) {
  const fiber = {
    type: vnode.type,
    key: vnode.key,
    props: vnode.props,
    //原生标签 dom 
    // class组件 实例
    stateNode: null,
    child: null,
    sibling: null,
    return: returnFiber,
    //标记fiber任务类型 插入 更新 删除

    flags: Placement,

    // 当前层级下标
    index: null
  }

  // 判断tag
  const {type} = fiber
  if (isStr(type)) {
    fiber.tag = HostComponent
  } else if (isFunction(type)) {
    fiber.tag = type.prototype.isReactComponent ? ClassComponent :
      FunctionComponent
  } else if(isUndefined(type)){
    fiber.tag = HostText
    fiber.props = {children: vnode}
  } else {
    fiber.tag = Fragment
  }

  return fiber
}

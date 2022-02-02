import { Placement } from "./utils"

export  function createFiber(vnode, returnFiber) {
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

  return fiber
}

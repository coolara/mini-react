import { renderWithHooks } from "./hooks";
import { createFiber } from "./reactFiber";
import { isArray, isStringOrNumber, Update, updateNode } from "./utils"

export function updateHostComponent(wip) {
  if (!wip.stateNode) {
    wip.stateNode = document.createElement(wip.type)
    // 更新属性
    updateNode(wip.stateNode, {}, wip.props)
  };
  // 协调子
  reconcilerChildren(wip, wip.props.children)
};

export function updateFunctionComponent(wip) {
  renderWithHooks(wip)
  const { type, props } = wip
  const children = type(props)
  reconcilerChildren(wip, children)
};

export function updateClassComponent(wip) {
  const { type, props } = wip
  const instance = new type(props)
  const children = instance.render()
  reconcilerChildren(wip, children)
};

export function updateTextComponent(wip) {
  wip.stateNode = document.createTextNode(wip.props.children)
}

export function updateFragmentComponent(wip) {
  reconcilerChildren(wip, wip.props.children)
}


function reconcilerChildren(wip, children) {
  if (isStringOrNumber(children)) return
  const newChildren = isArray(children) ? children : [children]
  let previousNewFiber = null // 记录上一次的fiber
  let oldFiber = wip.alternate?.child
  for (let i = 0; i < newChildren.length; i++) {
    const newChild = newChildren[i];
    const newFiber = createFiber(newChild, wip)
    const same = sameNode(newFiber, oldFiber)
    if(same) {
      Object.assign(newFiber, {
        stateNode: oldFiber.stateNode,
        alternate: oldFiber,
        flags: Update
      })
    }
    if(oldFiber){
      oldFiber = oldFiber.sibling;
    }
    if (i == 0) {
      wip.child = newFiber
    } else {
      previousNewFiber.sibling = newFiber
    }
    previousNewFiber = newFiber
  }
}


function sameNode(a, b) {
  return a && b && a.type == b.type && a.key == b.key
}
import { createFiber } from "./reactFiber";
import { isArray, isStringOrNumber, updateNode } from "./utils"

export function updateHostComponent(wip) {
    if (!wip.stateNode) {
        wip.stateNode = document.createElement(wip.type)
        // 更新属性
        updateNode(wip.stateNode, wip.props)
    };
    // 协调子
    reconcilerChildren(wip, wip.props.children)
};


function reconcilerChildren(wip, children) {
    if (isStringOrNumber(children)) return
    const newChildren = isArray(children) ? children : [children]
    let previousNewFiber = null
    for (let i = 0; i < newChildren.length; i++) {
        const newChild = newChildren[i];
        const newFiber = createFiber(newChild, wip)
        if (i == 0) {
            wip.child = newFiber
        } else {
            previousNewFiber.sibling = newFiber
        }
        previousNewFiber = newFiber
    }
}

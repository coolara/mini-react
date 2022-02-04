import { updateClassComponent, updateFragmentComponent, updateFunctionComponent, updateHostComponent, updateTextComponent } from "./ReactFiberReconciler";
import { ClassComponent, Fragment, FunctionComponent, HostComponent, HostText } from "./ReactWorkTag";
import { Placement } from "./utils"

// work in progress 当前工作中的fiber
let wip = null

let wipRoot = null

export function scheduleUpdateOnFiber(fiber) {
    wip = fiber;
    wipRoot = fiber
}


// 1 执行当前wip任务
// 2 更新wip
function performUnitOfWork() {
    const { type, tag } = wip
    switch (tag) {
        case HostComponent:
            updateHostComponent(wip)
            break;
        case FunctionComponent:
            updateFunctionComponent(wip)
            break;
        case ClassComponent:
            updateClassComponent(wip)
            break
        case HostText:
            updateTextComponent(wip)
            break;
        case Fragment:
            updateFragmentComponent(wip)
            break;
    }
    // 深度优先遍历
    if (wip.child) {
        wip = wip.child
        return
    }
    let next = wip
    while (next) {
        if (next.sibling) {
            wip = next.sibling
            return
        }
        next = next.return
    }
    wip = null
}

function workLoop(idleCallback) {
    while (wip && idleCallback.timeRemaining() > 0) {
        performUnitOfWork()
    }
    if (!wip && wipRoot) {
        commitRoot()
    }
}

function commitRoot() {
    commitWorker(wipRoot)
    wipRoot = null
}

function commitWorker(wip) {
    // 更新自己
    // 更新子和兄弟
    if (!wip) return

    const { flags, stateNode } = wip
    const parentNode = getParentNode(wip.return)
    if (flags & Placement && stateNode) {
        parentNode.appendChild(stateNode)
    }

    commitWorker(wip.child)

    commitWorker(wip.sibling)
}

function getParentNode(wip) {
    let parent = wip
    while (parent) {
        if (parent.stateNode) {
            return parent.stateNode
        }
        parent = parent.return
    }
}
requestIdleCallback(workLoop)

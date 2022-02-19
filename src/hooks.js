import { scheduleUpdateOnFiber } from "./ReactFiberWorkLoop"

let currentlyRenderingFiber = null
let workInProgressHook = null

export function renderWithHooks(wip) {
  currentlyRenderingFiber = wip
  currentlyRenderingFiber.memorizedState = null
  workInProgressHook = null
}

function updateWorkInProgressHook (){
    const current = currentlyRenderingFiber.alternate;
    let hook;
    if(current){
      // 更新
      currentlyRenderingFiber.memorizedState = current.memorizedState
      if(workInProgressHook) {
        workInProgressHook = hook= workInProgressHook.next
      }else{
        workInProgressHook = hook = currentlyRenderingFiber.memorizedState
      }
    }else {
       // 初次渲染
      if (workInProgressHook) {
        workInProgressHook = workInProgressHook.next = hook
      } else {
        // hook0
        hook = {
          memorizedState: null,  // state
          next: null // 下一个hook
        }
        workInProgressHook = currentlyRenderingFiber.memorizedState = hook
      }
    }
    return hook
    
}

export function useReducer(reducer, initialState) {
  const hook = updateWorkInProgressHook()
  if(!currentlyRenderingFiber.alternate){
    // 初次渲染
    hook.memorizedState = initialState
  }
  const dispatch = dispatchReducerAction.bind(null, currentlyRenderingFiber, hook, reducer)
  return [hook.memorizedState, dispatch]
}

export function useState(initialState) {
  const hook = updateWorkInProgressHook()
  const dispatch = dispatchReducerAction.bind(null, currentlyRenderingFiber, hook, reducer )
  return [initialState, dispatch]
}

function dispatchReducerAction(fiber, hook, reducer){
  hook.memorizedState = reducer(hook.memorizedState)
  fiber.alternate = { ...fiber }
  fiber.sibling = null
  scheduleUpdateOnFiber(fiber)
}
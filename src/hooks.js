let currentRenderFiber = null
let workInProgressHook = null
export function updateHooksOnFiber(fiber) {
  
}
export function useReducer(callback, initialState) {
  const dispatch = () => {
    console.log('dd')
  }
  return [initialState, dispatch]
}
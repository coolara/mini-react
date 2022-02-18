import { peek, pop, push } from "./minHeap"

let taskQueue = []
let taskIdCounter = 1

// todo 优先级 延迟时间
export function scheduleCallback(callback) {
  const currentTime = getCurrentTime()
  const timeout = -1
  const expirationTime = currentTime + timeout
  const newTask = {
    id: taskIdCounter++,
    callback,
    expirationTime,
    sortIndex: expirationTime
  }
  push(taskQueue, newTask)
  // 请求任务调度
  requestHostCallback()
}

function requestHostCallback(){
  port2.postMessage(null)
}

const channel = new MessageChannel()
const port2 = channel.port2

channel.port1.onmessage = function(){
  workLoop()
}

function workLoop(){
  let currentTask = peek(taskQueue)
  while(currentTask){
    const callback = currentTask.callback
    currentTask.callback = null
    callback()
    pop(taskQueue)
    currentTask = peek(taskQueue)
  }
}

function getCurrentTime() {
  return performance.now()
}
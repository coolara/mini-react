export function peek (heap){
    return heap.length === 0 ? null : heap[0]
}

export function push(heap,node ){
  const len = heap.length;
  heap.push(node)
  siftUp(heap, node, len)
}

function siftUp(heap, node, i){
  let index = i
  while(index > 0){
    const parentIndex = index >> 1
    const parent = heap[parentIndex]
    if(compare(parent, node )> 0){
      heap[parentIndex] = node
      heap[index] = parent
      index = parentIndex
    }else {
      return
    }
  }
}

export function pop(heap){
  if(heap.length == 0)return
  const first = heap[0]
  const last = heap.pop()
  if(first !== last){
    heap[0] = last
    siftDown(heap, last, 0)
  }
}

function siftDown(heap, node, i){
  let index = i
  const len = heap.length 
  const halfLen = len >> 1
  while (index < halfLen){
    const leftIndex = index * 2 + 1
    const left = heap[leftIndex]
    const rightIndex = leftIndex + 1
    const right = heap[rightIndex]
    if (compare(node, left) > 0) {
      if (rightIndex < len && compare(left, right) > 0) {
        // right最小
        heap[rightIndex] = node
        heap[index] = right
        index = rightIndex
      } else {
        // left 最小
        heap[leftIndex] = node
        heap[index] = left
        index = leftIndex
      }
    } else if (rightIndex < len && compare(node, right) > 0) {
        // right最小
      heap[rightIndex] = node
      heap[index] = right
      index = rightIndex
    } else {
      // parent 最小 不需要调整
      break
    }
  }
}



function compare (a, b){
  return a-b;
  const diff = a.sortIndex - b.sortIndex
  return diff !== 0 ? diff : a.id - b.id
}
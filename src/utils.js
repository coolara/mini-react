export const NoFlags =    0b00000000000000000000;
export const Placement =  0b0000000000000000000010;
export const Update =     0b0000000000000000000100;
export const Deletion =   0b0000000000000000001000;

export function isStr (s){
    return typeof s ==='string'
}


export function isStringOrNumber(s){
    return typeof s ==='string' ||  typeof s ==='number'
}

export function isFunction(fn){
    return typeof fn === 'function'
};

export function isArray(arr){
    return Array.isArray(arr)
};

export  function isUndefined(s){
    return typeof s === 'undefined'
};



export function updateNode(node, preVal,  nextVal){
    Object.keys(preVal).forEach(k => {
      if(k.slice(0, 2) === 'on'){
        const eventName = k.slice(2).toLowerCase()
        node.removeEventListener(eventName, preVal[k])
      }
    })
    Object.keys(nextVal).forEach(k => {
        if(k==='children'){
            if(isStringOrNumber(nextVal[k])){
                node.textContent= nextVal[k]+''
            }
        }else if(k.slice(0,2) === 'on'){
          const eventName = k.slice(2).toLowerCase()
          node.addEventListener(eventName, nextVal[k])
        } else{
            node[k] = nextVal[k]
        }
    })
};


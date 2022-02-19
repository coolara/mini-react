
import './index.css'
import { ReactDOM, Component, useReducer, useState} from '../which-react'
function FunctionComponent(props) {
  const [count ,setCount ] = useReducer(x => x + 1, 0)
  const [count1, setCount1] = useState(0)
  return (
    <div className='border'>
      <p>{props.name}</p>
      <button onClick={()=> setCount()}>useReducer: {count}</button>
      <button onClick={()=> setCount1(()=>count1 + 1)}>useState: {count1}</button>
    </div>
  )
}
class ClassComponent extends Component{
  render(){
    return (
      <div className='border'>
        <p>{this.props.name}</p>
        我是文本
      </div>
    )
  }
}

function FragmentComponent(props) {
  return (
    <ul className='border'>
      {props.name}
      <>
        <li>part1</li>
        <li>part2</li>
      </>
    </ul>
  )
}


const jsx =  (
  <div className='border'>
    <h1>mini-react</h1>
    <p>hello react</p>
    <FunctionComponent name="函数组件" />
    <ClassComponent name="类组件" />
    <FragmentComponent  name="fragment组件"/>
  </div>
)
ReactDOM.createRoot(document.getElementById('root')).render(jsx)

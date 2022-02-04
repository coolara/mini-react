
import './index.css'
import {ReactDOM, Component} from '../which-react'
function FunctionComponent(props) {
  return (
    <div className='border'>
      <p>{props.name}</p>
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

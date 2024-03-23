/** @jsx MReact.createElement */
// 使用上面那个 pragma 指定转换方法jsx名称之后，空标签依然使用的是 React.Fragment，而不是 MReact.Fragment。
// 需要下面这个 pragma 进行替换
/** @jsxFrag MReact.fragment*/
import MReact from './core/React.js'

let msg = '无法更新的语句'
let num = 0

function increment() {
  console.log('increment', num)
  num++
}

// 获取不到 DOM
console.log(document.querySelector('#btn'))
const App = (
  // 空标签实际上是React.Fragment,因为没有定义，所以会渲染为一个 undefined tags
  <>
    <div id="app">
      <p>{msg}</p>
      <p>{num}</p>
      {/* 无法赋值上 onClick */}
      <button onClick={increment}>onClick</button>
      <button id="btn" className="1234" onclick={increment}>
        无法更新
      </button>
    </div>
    <div>
      <span>1 &gt; 0? </span>
      {1 > 0 ? <span>yes</span> : <span>no</span>}
    </div>
  </>
)
function AppOne() {
  return <div id="app">Hello World</div>
}
console.log(AppOne)
export default App

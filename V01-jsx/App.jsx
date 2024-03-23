import React from './core/React.js'

let msg = '无法更新的语句'
let num = 0

function increment() {
  console.log('increment', num)
  num++
}

// 获取不到 DOM
console.log(document.querySelector('#btn'))
const App = (
  // 因为没有做特殊处理，所以会渲染一个 undefined tags
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
// function App() {
//   return <div id="app">Hello World</div>
// }
export default App

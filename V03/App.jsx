import React from './core/React.js'

let msg = '无法更新的语句'
let num = 0

function increment() {
  console.log('increment', num)
  num++
}

const arr = []
// i 的范围再多加一个 0 就会栈溢出
for (let i = 0; i < 100000; i++) {
  arr.push(<li>{i}</li>)
}
// 获取不到 DOM
console.log(document.querySelector('#btn'))
// const App = (
//   // 空标签实际上是React.Fragment,因为没有定义，所以会渲染为一个 undefined tags
//   <>
//     <div id="app">
//       <p>{msg}</p>
//       <p>{num}</p>
//       {/* 无法赋值上 onClick */}
//       <button onClick={increment}>onClick</button>
//       <button id="btn" className="1234" onclick={increment}>
//         无法更新
//       </button>
//       <ul>{arr}</ul>
//     </div>
//     <div>
//       <span>1 &gt; 0? </span>
//       {1 > 0 ? <span>yes</span> : <span>no</span>}
//     </div>
//   </>
// )
function Counter({ count }) {
  return <div>{count}</div>
}

function App() {
  return (
    <div>
      Count:
      <Counter count="123"></Counter>
      <Counter count="456"></Counter>
    </div>
  )
}
export default App

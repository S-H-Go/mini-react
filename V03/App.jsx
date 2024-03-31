import React from './core/React.js'
import Todos from './todos/index.jsx'

// function Counter({ count, name, onClick }) {
//   console.log('rander', name)
//   return (
//     <div>
//       {count}
//       <button onClick={onClick}>click{name}</button>
//     </div>
//   )
// }
// let countApp = 0
// let countBar = 0
// let countFoo = 0
// function createClick(increment, update) {
//   return function () {
//     increment()
//     update()
//   }
// }
// function App() {
//   console.log('rander App')
//   return (
//     <div>
//       {countApp}
//       <button onClick={createClick(() => countApp++, React.update())}>App</button>
//       <Counter count={countBar} name="bar" onClick={createClick(() => countBar++, React.update())}></Counter>
//       <Counter count={countFoo} name="foo" onClick={createClick(() => countFoo++, React.update())}></Counter>
//     </div>
//   )
// 

function App() {
  return (
    <Todos></Todos>
  )
}
export default App

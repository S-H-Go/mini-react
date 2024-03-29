import React from './core/React.js'

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
// }

let countBar = 0
function Bar() {
  console.log('bar')
  const [count, setCount] = React.useState(10)
  const [num, setNum] = React.useState(20)
  function handleClick() {
    setCount(count + 1)
    setCount(count + 1)
    setCount(count + 1)

    setNum((n) => n + 2)
  }
  return (
    <div>
      <h1>Bar</h1>
      <div>count:{count}</div>
      <div>num:{num}</div>
      <button onClick={handleClick}>Bar</button>
    </div>
  )
}
let countFoo = 0
function Foo() {
  console.log('foo')
  const update = React.update()
  function handleClick() {
    countFoo++
    update()
  }
  return (
    <div>
      <h1>Foo</h1>
      {countFoo}
      <button onClick={handleClick}>Foo</button>
    </div>
  )
}
let countApp = 0
let showA = true
function App() {
  console.log('App')
  const update = React.update()
  function handleClick() {
    countApp++
    showA = !showA
    update()
  }
  const a = <div>123</div>
  return (
    <div>
      {showA && a}
      <h1>App</h1>
      {countApp}
      <button onClick={handleClick}>App</button>
      <Bar></Bar>
      <Foo></Foo>
    </div>
  )
}
export default App

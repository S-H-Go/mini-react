import React from './core/React.js'

let count = 0
let showFoo = false
function Counter({ num }) {
  function handleClick() {
    count++
    showFoo = !showFoo
    React.update()
  }
  function Foo() {
    return <p>foo</p>
  }
  const bar = <p>bar</p>
  return (
    <div>
      <button onClick={handleClick}>click</button>
      {showFoo ? <Foo></Foo> : bar}
    </div>
  )
}
function App() {
  return (
    <div>
      hello-world
      <Counter num={count}></Counter>
    </div>
  )
}
export default App

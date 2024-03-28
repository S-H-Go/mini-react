import React from './core/React.js'

let count = 0
let showFoo = false
function Counter({ num }) {
  function handleClick() {
    count++
    showFoo = !showFoo
    React.update()
  }
  const foo = (
    <div>
      foo
      <div>child1</div>
      <div>child2</div>
    </div>
  )
  const bar = <div>bar</div>
  return (
    <div>
      <button onClick={handleClick}>click</button>
      <div>{showFoo ? foo : bar}</div>
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

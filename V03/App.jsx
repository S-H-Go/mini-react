import React from './core/React.js'

let count = 0
function Counter({ num }) {
  function handleClick() {
    count++
    React.update()
  }
  return (
    <div>
      <div>count: {count}</div>
      <div>num: {num}</div>
      <button onClick={handleClick}>click</button>
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

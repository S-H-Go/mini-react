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
      {showFoo && bar}
      <div>foo1</div>
      {showFoo && bar}
      <button onClick={handleClick}>click</button>
      <div>foo2</div>
      {showFoo && bar}
      
      {/* <div>{showFoo ? foo : bar}</div> */}

      {/* {count % 2 !== 1 && <div>4</div>}
      <button onClick={handleClick}>click</button>
      {count % 2 === 1 ? <div>1</div>  : <div>2</div> }
      {count % 2 === 1 && <div>3</div> } */}
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

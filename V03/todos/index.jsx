import React from '../core/React'
const { useState, useEffect } = React

function Todos() {
  let [inputValue, setInputValue] = useState('')
  const [type, setType] = useState('all')
  const [list, setList] = useState([])
  const [displayList, setDisplayList] = useState([])

  function getDisplayList() {
    let filteredList = list
    if (type !== 'all') {
      filteredList = list.filter((item) => {
        if (type === 'done') {
          return item.done
        } else {
          return !item.done
        }
      })
    }
    return filteredList
  }
  useEffect(() => {
    setList(JSON.parse(localStorage.getItem('todos')) || [])
  }, [])

  useEffect(() => {
    setDisplayList(getDisplayList())
  }, [list, type])

  function handleInput(e) {
    setInputValue(e.target.value)
    inputValue = e.target.value
  }

  function handleKeyPress(e) {
    if (e.key === 'Enter') {
      handleAdd()
    }
  }

  function handleAdd() {
    let done
    if (type === 'all' || type === 'active') {
      done = false
    } else {
      done = true
    }
    let id = list.reduce((maxID, item) => Math.max(maxID, item.id), 0) + 1
    if (inputValue !== '') {
      setList(() => [...list, { id, content: inputValue, done }])
    }
    setInputValue('')
  }

  function handleSave() {
    localStorage.setItem('todos', JSON.stringify(list))
  }

  function handleTypeChange(e) {
    setType(e.target.value)
  }

  function handleRemove(id) {
    const newList = list.filter((item) => {
      return item.id !== id
    })
    setList(newList)
  }

  function handleDoneOrActive(id) {
    const newList = [...list]
    let target = newList.find((item) => item.id === id)
    target.done = !target.done
    setList(newList)
  }
  return (
    <div>
      <h1>TODOS</h1>
      <input type="text" onInput={handleInput} onKeyPress={handleKeyPress} value={inputValue} />
      <button onClick={handleAdd}>add</button>
      <div>
        <button onClick={handleSave}>save</button>
      </div>
      <input type="radio" name="type" id="all" checked value="all" onChange={handleTypeChange} />
      <label htmlFor="all">all</label>
      <input type="radio" name="type" id="done" value="done" onChange={handleTypeChange} />
      <label htmlFor="done">done</label>
      <input type="radio" name="type" id="active" value="active" onChange={handleTypeChange} />
      <label htmlFor="active">active</label>
      <ul>
        {displayList.map((item) => (
          <li>
            <span style={{ 'text-decoration': item.done ? 'line-through' : 'none' }} className={item.done ? 'line-through' : ''}>
              {item.content}
            </span>
            <button onClick={() => handleRemove(item.id)}>remove</button>
            <button onClick={() => handleDoneOrActive(item.id)}>{item.done ? 'active' : 'done'}</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Todos

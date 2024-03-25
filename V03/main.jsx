// 因为在这里也使用的 jsx 语法（第 7 行）所以也需要重新声明
import React from './core/React.js'
import ReactDOM from './core/ReactDOM.js'
import App from './App.jsx'
console.log('App', App)
console.log('<App />', <App />)
ReactDOM.createRoot(document.querySelector('#root')).render(<App />)

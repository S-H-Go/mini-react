import React from './core/React.js'
import ReactDOM from './core/ReactDOM.js'
import App from './App.jsx'
console.log('App', App)
console.log('<App />', <App />)
ReactDOM.createRoot(document.querySelector('#root')).render(App)
// 还不支持 函数组件
// ReactDOM.createRoot(document.querySelector('#root')).render(<App />)

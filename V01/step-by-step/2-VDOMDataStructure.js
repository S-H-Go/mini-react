/* 抽象出 vdom 的数据结构 */

const textEl = {
  type: 'TEXT_ELEMENT',
  props: {
    nodeValue: 'Hello World',
    children: [],
  },
}
const el = {
  type: 'div',
  props: {
    id: 'app',
    children: [textEl],
  },
}

const App = document.createElement(el.type)
App.id = el.props.id
document.querySelector('#root').append(App)

const Text = document.createTextNode('')
Text.nodeValue = textEl.props.nodeValue
App.append(Text)

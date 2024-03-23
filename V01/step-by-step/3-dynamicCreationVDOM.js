/* 动态创建 vdom */

function createTextNode(nodeValue) {
  return {
    type: 'TEXT_ELEMENT',
    props: {
      nodeValue,
      children: [],
    },
  }
}
function createElement(type, props, ...children) {
  return {
    type,
    props: {
      ...props,
      children,
    },
  }
}
const textNode = createTextNode('Hello World')
const dom = createElement('div', { id: 'app' }, textNode)

const App = document.createElement(dom.type)
App.id = dom.props.id
document.querySelector('#root').append(App)

const textDom = document.createTextNode('')
textDom.nodeValue = textNode.props.nodeValue
App.append(textDom)

/* 将由 vdom 转换为真实 dom 的过程抽离为渲染函数 */

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
function render(vdom, container) {
  let dom
  // 根据不同的vdom类型创建对应的真实dom
  if (vdom.type === 'TEXT_ELEMENT') {
    dom = document.createTextNode('')
  } else {
    dom = document.createElement(vdom.type)
  }
  // 处理 vdom 的 props
  Object.keys(vdom.props).forEach((key) => {
    if (key !== 'children') {
      dom[key] = vdom.props[key]
    }
  })
  // 处理 vdom 的 children
  vdom.props.children.forEach((child) => {
    render(child, dom)
  })
  // 在容器中添加 dom
  container.append(dom)
}

const textNode = createTextNode('Hello World')
const dom = createElement('div', { id: 'app' }, textNode)

render(dom, document.querySelector('#root'))

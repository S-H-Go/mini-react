/* 模拟 React 的 api */

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
      children: children.map((child) => {
        if (typeof child === 'string') {
          return createTextNode(child)
        } else {
          return child
        }
      }),
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

const ReactDOM = {
  createRoot(container) {
    return {
      render(el) {
        render(el, container)
      },
    }
  },
}

const dom = createElement('div', { id: 'app' }, 'Hello ', 'World')
ReactDOM.createRoot(document.querySelector('#root')).render(dom)

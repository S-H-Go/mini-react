const Fragment = 0

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
        if (typeof child === 'string' || typeof child === 'number') {
          return createTextNode(child)
        } else if (Array.isArray(child)) {
          return createElement(Fragment, null, ...child)
        } else {
          return child
        }
      }),
    },
  }
}

function render(vdom, container) {
  nextWorkOfUnit = {
    dom: container,
    props: {
      children: [vdom],
    },
  }
}

let nextWorkOfUnit = {}
function workLoop(DealLine) {
  let shouldYield = false
  while (!shouldYield && nextWorkOfUnit) {
    nextWorkOfUnit = preformWorkOfUnit(nextWorkOfUnit)
    shouldYield = DealLine.timeRemaining() < 1
  }

  requestIdleCallback(workLoop)
}

requestIdleCallback(workLoop)
function createDom(type) {
  // 根据不同的vdom类型创建对应的真实dom
  if (type === 'TEXT_ELEMENT') {
    return document.createTextNode('')
  } else if (type === Fragment) {
    return document.createDocumentFragment()
  } else {
    return document.createElement(type)
  }
}

function updateProps(dom, props) {
  Object.keys(props).forEach((key) => {
    if (key !== 'children') {
      dom[key] = props[key]
    }
  })
}

function initChildren(fiber) {
  const children = fiber.props.children
  let prevChild = null
  children.forEach((child, index) => {
    const newFiber = {
      type: child.type,
      props: child.props,
      child: null,
      parent: fiber,
      sibling: null,
      dom: null,
    }
    if (index === 0) {
      fiber.child = newFiber
    } else {
      prevChild.sibling = newFiber
    }
    prevChild = newFiber
  })
}
function preformWorkOfUnit(fiber) {
  if (!fiber.dom) {
    fiber.dom = createDom(fiber.type)

    fiber.parent.dom.append(fiber.dom)

    updateProps(fiber.dom, fiber.props)
  }
  // 转换成链表结构
  initChildren(fiber)
  // 返回下一次空闲时间要调度的任务
  if (fiber.child) {
    return fiber.child
  }
  if (fiber.sibling) {
    return fiber.sibling
  }
  return fiber.parent?.sibling
}
const React = {
  createElement,
  render,
  Fragment,
}

export default React

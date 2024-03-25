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
  root = nextWorkOfUnit
}
let root = null
let nextWorkOfUnit = {}
function workLoop(DealLine) {
  let shouldYield = false
  while (!shouldYield && nextWorkOfUnit) {
    nextWorkOfUnit = preformWorkOfUnit(nextWorkOfUnit)
    shouldYield = DealLine.timeRemaining() < 1
  }
  if (!nextWorkOfUnit && root) {
    commitRoot()
  }

  requestIdleCallback(workLoop)
}

function commitRoot() {
  commitWork(root.child)
  root = null
}

function commitWork(fiber) {
  if (!fiber) return

  let fiberParent = fiber.parent
  while (!fiberParent.dom) {
    fiberParent = fiberParent.parent
  }
  if (fiber.dom) {
    fiberParent.dom.append(fiber.dom)
  }
  commitWork(fiber.child)
  commitWork(fiber.sibling)
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

function initChildren(fiber, children) {
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

function updateFunctionComponent(fiber) {
  const children = [fiber.type(fiber.props)]
  initChildren(fiber, children)
}

function updateHostComponent(fiber) {
  if (!fiber.dom) {
    fiber.dom = createDom(fiber.type)
    updateProps(fiber.dom, fiber.props)
  }
  // 转换成链表结构
  const children = fiber.props.children
  initChildren(fiber, children)
}
function preformWorkOfUnit(fiber) {
  const isFunctionComponent = typeof fiber.type === 'function'
  isFunctionComponent ? updateFunctionComponent(fiber) : updateHostComponent(fiber)

  // 返回下一次空闲时间要调度的任务
  if (fiber.child) {
    return fiber.child
  }
  let prevFiber = fiber
  while (prevFiber) {
    if (prevFiber.sibling) return prevFiber.sibling
    prevFiber = prevFiber.parent
  }
}
const React = {
  createElement,
  render,
  Fragment,
}

export default React

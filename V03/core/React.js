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
  wipRoot = {
    dom: container,
    props: {
      children: [vdom],
    },
  }
  nextWorkOfUnit = wipRoot
}

function update() {
  wipRoot = {
    dom: currentRoot.dom,
    props: currentRoot.props,
    alternate: currentRoot,
  }
  nextWorkOfUnit = wipRoot
}
let wipRoot = null
let currentRoot = null
let nextWorkOfUnit = {}
let deletions = []
function workLoop(DealLine) {
  let shouldYield = false
  while (!shouldYield && nextWorkOfUnit) {
    nextWorkOfUnit = preformWorkOfUnit(nextWorkOfUnit)
    shouldYield = DealLine.timeRemaining() < 1
  }
  if (!nextWorkOfUnit && wipRoot) {
    commitRoot()
  }

  requestIdleCallback(workLoop)
}

function commitRoot() {
  deletions.forEach(commitDeletion)
  commitWork(wipRoot.child)
  currentRoot = wipRoot
  wipRoot = null
  deletions = []
}

function commitDeletion(fiber) {
  if (fiber.dom) {
    let fiberParent = fiber.parent
    while (!fiberParent.dom) {
      fiberParent = fiberParent.parent
    }
    fiberParent.dom.removeChild(fiber.dom)
  } else {
    commitDeletion(fiber.child)
  }
}

function commitWork(fiber) {
  if (!fiber) return
  let fiberParent = fiber.parent
  while (!fiberParent.dom) {
    fiberParent = fiberParent.parent
  }
  if (fiber.dom) {
    if (fiber.effectTag === 'update') {
      updateProps(fiber.dom, fiber.props, fiber.alternate.props)
    } else if (fiber.effectTag === 'placement') {
      fiberParent.dom.append(fiber.dom)
    }
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

function updateProps(dom, nextProps, prevProps) {
  Object.keys(prevProps).forEach((key) => {
    if (key !== 'children') {
      if (!(key in nextProps)) {
        dom.removeAttribute(key)
      }
    }
  })

  Object.keys(nextProps).forEach((key) => {
    if (key !== 'children') {
      if (nextProps[key] !== prevProps[key])
        if (key.startsWith('on')) {
          const eventType = key.toLowerCase().slice(2)
          dom.removeEventListener(eventType, prevProps[key])
          dom.addEventListener(eventType, nextProps[key])
        } else {
          dom[key] = nextProps[key]
        }
    }
  })
}

function reconcileChildren(fiber, children) {
  let prevChild = null
  let oldFiber = fiber.alternate?.child
  children.forEach((child, index) => {
    const isSameType = oldFiber && oldFiber.type === child.type
    let newFiber
    if (isSameType) {
      newFiber = {
        type: child.type,
        props: child.props,
        child: null,
        parent: fiber,
        sibling: null,
        dom: oldFiber.dom,
        alternate: oldFiber,
        effectTag: 'update',
      }
    } else {
      newFiber = {
        type: child.type,
        props: child.props,
        child: null,
        parent: fiber,
        sibling: null,
        dom: null,
        effectTag: 'placement',
      }
      if (oldFiber) {
        deletions.push(oldFiber)
      }
    }
    if (oldFiber) {
      oldFiber = oldFiber.sibling
    }
    if (index === 0) {
      fiber.child = newFiber
    } else {
      prevChild.sibling = newFiber
    }
    prevChild = newFiber
  })
  // 删除多余的节点
  while (oldFiber) {
    deletions.push(oldFiber)
    oldFiber = oldFiber.sibling
  }
}

function updateFunctionComponent(fiber) {
  const children = [fiber.type(fiber.props)]
  reconcileChildren(fiber, children)
}

function updateHostComponent(fiber) {
  if (!fiber.dom) {
    fiber.dom = createDom(fiber.type)
    updateProps(fiber.dom, fiber.props, {})
  }
  // 转换成链表结构
  const children = fiber.props.children
  reconcileChildren(fiber, children)
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
  update,
  createElement,
  render,
  Fragment,
}

export default React

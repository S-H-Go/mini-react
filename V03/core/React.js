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
  function convertElement(child) {
    return typeof child === 'object' ? child : createTextNode(child)
  }
  return {
    type,
    props: {
      ...props,
      children: children.reduce((prev, child) => {
        if (!child) return [...prev]
        if (Array.isArray(child)) {
          return [...prev, ...child.map((c) => convertElement(c))]
        }
        return [...prev, convertElement(child)]
      }, []),
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
  const currentFiber = wipFiber
  return () => {
    wipRoot = {
      ...currentFiber,
      alternate: currentFiber,
    }
    nextWorkOfUnit = wipRoot
  }
}
let wipRoot = null
let currentRoot = null
let nextWorkOfUnit = {}
let deletions = []
let wipFiber = null
function workLoop(DealLine) {
  let shouldYield = false
  while (!shouldYield && nextWorkOfUnit) {
    nextWorkOfUnit = preformWorkOfUnit(nextWorkOfUnit)
    if (wipRoot?.sibling?.type === nextWorkOfUnit?.type) {
      nextWorkOfUnit = null
    }
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
      if (child) {
        newFiber = {
          type: child.type,
          props: child.props,
          child: null,
          parent: fiber,
          sibling: null,
          dom: null,
          effectTag: 'placement',
        }
      }
      if (oldFiber) {
        deletions.push(oldFiber)
      }
    }
    if (oldFiber) {
      oldFiber = oldFiber.sibling
    }
    // if (!fiber.child && newFiber) {
    //   fiber.child = newFiber
    // }
    // if (fiber.child) {
    //   prevChild.sibling = newFiber
    // }
    // TODO 搞不懂 只有这样才不报错
    if (index === 0 || !prevChild) {
      fiber.child = newFiber
    } else {
      prevChild.sibling = newFiber
    }
    // if (index === 0) {
    //   fiber.child = newFiber
    // } else {
    //   prevChild.sibling = newFiber
    // }
    // if (!fiber.child) {
    //   fiber.child = newFiber
    // } else {
    //   console.log(fiber)
    //   prevChild.sibling = newFiber
    // }
    if (newFiber) {
      prevChild = newFiber
    }
  })
  // 删除多余的节点
  while (oldFiber) {
    deletions.push(oldFiber)
    oldFiber = oldFiber.sibling
  }
}

function updateFunctionComponent(fiber) {
  wipFiber = fiber
  stateHooks = []
  stateHooksIndex = 0
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

let stateHooks
let stateHooksIndex
function useState(initial) {
  let currentFiber = wipFiber
  const oldStateHook = currentFiber.alternate?.stateHooks[stateHooksIndex]
  const stateHook = {
    state: oldStateHook ? oldStateHook.state : initial,
    queue: oldStateHook ? oldStateHook.queue : [],
  }
  stateHook.queue.forEach((action) => {
    stateHook.state = action(stateHook.state)
  })
  stateHook.queue = []
  stateHooksIndex++
  stateHooks.push(stateHook)
  currentFiber.stateHooks = stateHooks
  function setState(action) {
    stateHook.queue.push(typeof action === 'function' ? action : () => action)
    wipRoot = {
      ...currentFiber,
      alternate: currentFiber,
    }
    nextWorkOfUnit = wipRoot
  }
  return [stateHook.state, setState]
}
const React = {
  update,
  createElement,
  render,
  useState,
  Fragment,
}

export default React

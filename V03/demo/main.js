const div = document.createElement('div')
div.innerHTML = 'Hello'
document.body.append(div)

function loop() {
  let count = 0
  while (count < 10000000000) {
    count++
  }
  console.log('count:', count)
}

let count = 0
const goal = 10000000
function workLoop(IdleDeadline) {
  // console.log(IdleDeadline.timeRemaining())
  
  let shouldYield = false
  
  while (!shouldYield) {
    count++
    // 如果剩下的空闲时间小于 1 ms || 达到了目标 则跳出循环，这个任务应该等待浏览器的下一个空闲时间
    shouldYield = IdleDeadline.timeRemaining() < 1 || count === goal
  }
  console.log(count)
  
  // 如果达到了目标则不在请求浏览器在空闲时间执行该任务
  if (count !== goal) {
    requestIdleCallback(workLoop)
  }
}

requestIdleCallback(workLoop)

// 会导致阻塞
// loop()

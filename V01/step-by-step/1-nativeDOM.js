/* 使用真实 dom 创建 */

const div = document.createElement('div')
div.id = 'app'
document.querySelector('#root').append(div)

const text = document.createTextNode('')
text.nodeValue = 'Hello World'
div.appendChild(text)
